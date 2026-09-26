/**
 * Phase 1 baseline HTTP contract test for bmend.io.
 *
 * Framework-neutral: only Node built-ins (node:test, node:assert, global fetch).
 *
 *   BASE_URL set   -> assert against that already-running server (baseline run).
 *   BASE_URL unset -> spawn `pnpm run start --host 127.0.0.1 --port 4173`,
 *                     wait for bounded readiness, then tear the whole process
 *                     group down on success or failure.
 *
 * The child's process group is claimed the moment it is spawned, so a
 * readiness timeout or an early exit reaps it too.
 *
 * Expectations are derived from the current source models and the current
 * production build's actual responses. Anything the baseline does not do
 * (e.g. an `Allow` header on 405) is recorded, not asserted.
 *
 * Asset URLs are discovered from the served HTML, so the hashed-asset path
 * prefix may change between builds without invalidating this test.
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DEFAULT_BASE_URL = 'http://127.0.0.1:4173';
const EXTERNAL_BASE_URL = process.env['BASE_URL'];
const BASE_URL = (EXTERNAL_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');

const READY_TIMEOUT_MS = 60_000;
const FETCH_TIMEOUT_MS = 15_000;
const SHUTDOWN_TIMEOUT_MS = 10_000;
const POLL_INTERVAL_MS = 250;

/* --- Expected content, derived from app/models/*.server.ts --------------- */

const CANONICAL_URL = 'https://bmendoza.io/';
const TITLE = 'Bryan Mendoza';
const DESCRIPTION =
  'Your experienced web developer with nearly seven years of experience crafting tailored and accessible apps to skyrocket your success, using React, Next.js, and Remix.';
const OG_IMAGE =
  'https://res.cloudinary.com/dgqif0kkr/image/upload/q_auto,f_auto/bmendoza-io/shiba-inu.jpg';
const IMAGE_ALT =
  'a person holding a dog in front of a mirror with his head tilted to the side and his eyes wide open';
const KEYWORDS =
  'Experienced Developer, JavaScript, TypeScript, React, Remix, Next.js, Tailwind CSS, Node.js, GraphQL, Web Applications, Front-End Development, Back-End Development, Full-Stack Expertise, Responsive Design, Modern Web Technologies, User Experience, Web Accessibility, Application Development';

const TAGS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Remix',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
];

/** [companyName, jobTitle, startDate, endDate-or-Present] */
const EXPERIENCE = [
  ['Praxent', 'Senior Software Engineer', 'Jul 2022', 'Present'],
  ['Bejamas', 'Frontend Developer', 'Feb 2022', 'Jul 2022'],
  ['NBC Universal', 'Senior Frontend Developer', 'Feb 2021', 'Nov 2022'],
  ['Applaudo Studios', 'Frontend Developer', 'Feb 2019', 'May 2022'],
];

/** [name, href] */
const SOCIAL_LINKS = [
  ['LinkedIn', 'https://www.linkedin.com/in/bemendoza/'],
  ['GitHub', 'https://github.com/b-mendoza'],
  ['Email', 'mailto:bmendoza.dev@gmail.com'],
];

const CALENDLY_HREF =
  'https://calendly.com/bmendoza-dev/30-minute-chat-with-bryan-mendoza';

const HOMEPAGE_CACHE_CONTROL = 'max-age=60, stale-while-revalidate=86400';
const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const FAVICON_CACHE_CONTROL = 'public, max-age=3600, s-maxage=3600';
/** Methods the approved contract requires to keep answering 405. */
const UNSUPPORTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
/** Recorded for comparison only; not part of the approved 405 contract. */
const EXTRA_METHODS = ['OPTIONS'];

/* --- Small HTTP helpers -------------------------------------------------- */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = (path, init = {}) =>
  fetch(`${BASE_URL}${path}`, {
    redirect: 'manual',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    ...init,
  });

const getHtml = async (path) => {
  const response = await request(path);
  assert.equal(response.status, 200, `GET ${path} should be 200`);
  return { response, html: await response.text() };
};

/** Drop script payloads, inline styles and HTML comments so content
 * assertions cannot be satisfied by serialized loader/hydration data. */
const content = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

const countMatches = (haystack, pattern) =>
  (haystack.match(pattern) ?? []).length;

const readAttr = (tag, name) =>
  new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1] ?? null;

const readMeta = (haystack, attribute, key) =>
  new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`).exec(
    haystack,
  )?.[1] ?? null;

const linkTags = (html) => html.match(/<link\b[^>]*>/g) ?? [];
const linkHrefs = (html, matches) =>
  linkTags(html)
    .filter((tag) => matches(tag))
    .map((tag) => readAttr(tag, 'href'))
    .filter((href) => href !== null);

/* --- Server lifecycle ---------------------------------------------------- */

const isPortOpen = ({ hostname, port }) =>
  new Promise((resolve) => {
    const socket = net.connect({ host: hostname, port: Number(port) });
    const done = (open) => {
      socket.destroy();
      resolve(open);
    };
    socket.setTimeout(1_000);
    socket.once('connect', () => done(true));
    socket.once('error', () => done(false));
    socket.once('timeout', () => done(false));
  });

let server = null;

/** Reap the child's whole process group so pnpm's grandchildren cannot
 * outlive the run. Safe to call on a child that never started. */
const killGroup = (child, signal) => {
  if (child?.pid === undefined) return;
  try {
    process.kill(-child.pid, signal);
  } catch {
    /* group already gone */
  }
};

const spawnServer = async () => {
  const { hostname, port } = new URL(BASE_URL);

  /* Do not silently assert against whatever else owns the port. */
  assert.equal(
    await isPortOpen({ hostname, port }),
    false,
    `port ${port} is already in use; refusing to test an unrelated server`,
  );

  const child = spawn(
    'pnpm',
    ['run', 'start', '--host', hostname, '--port', port],
    { cwd: REPO_ROOT, detached: true, stdio: ['ignore', 'pipe', 'pipe'] },
  );

  /* Claim the process group before the first await: every throw below must
     still reap it, and the handle must be reachable from the exit hook even
     if `before` never resolves. */
  server = child;
  process.once('exit', () => {
    killGroup(server, 'SIGKILL');
  });

  let output = '';
  const collect = (chunk) => {
    output += chunk;
  };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);

  /* A failed spawn emits 'error' and may never emit 'exit'. */
  let spawnError = null;
  child.once('error', (error) => {
    spawnError = `spawn error: ${String(error)}`;
  });

  let exited = null;
  child.once('exit', (code, signal) => {
    exited = `exited (code=${code}, signal=${signal})`;
  });

  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const failure = spawnError ?? exited;

    if (failure !== null) {
      killGroup(child, 'SIGKILL');
      throw new Error(`server ${failure} before becoming ready:\n${output}`);
    }
    try {
      const response = await request('/');
      if (response.status > 0) return child;
    } catch {
      /* not listening yet */
    }
    await sleep(POLL_INTERVAL_MS);
  }

  killGroup(child, 'SIGKILL');
  throw new Error(`server not ready within ${READY_TIMEOUT_MS}ms:\n${output}`);
};

const stopServer = async (child) => {
  if (child?.pid === undefined) return;
  killGroup(child, 'SIGTERM');

  const deadline = Date.now() + SHUTDOWN_TIMEOUT_MS;
  while (child.exitCode === null && child.signalCode === null) {
    if (Date.now() > deadline) {
      killGroup(child, 'SIGKILL');
      return;
    }
    await sleep(POLL_INTERVAL_MS);
  }
};

before(async () => {
  if (EXTERNAL_BASE_URL !== undefined) return;
  await spawnServer();
});

after(async () => {
  await stopServer(server);
});

/* --- Contract ----------------------------------------------------------- */

describe(`baseline HTTP contract at ${BASE_URL}`, () => {
  it('GET / serves HTML with the homepage Cache-Control', async () => {
    const { response } = await getHtml('/');

    assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
    assert.equal(response.headers.get('cache-control'), HOMEPAGE_CACHE_CONTROL);
  });

  it('GET / renders experience, tags, social links and the Calendly link', async () => {
    const { html } = await getHtml('/');
    const body = content(html);

    assert.equal(countMatches(body, /<article>/g), EXPERIENCE.length);
    assert.equal(
      countMatches(body, /<li class="flex h-12 items-center/g),
      TAGS.length,
    );

    for (const [companyName, jobTitle, startDate, endDate] of EXPERIENCE) {
      assert.ok(
        body.includes(
          `<h3 class="scroll-m-20 tracking-tight text-[2.2rem] mb-[0.2rem] font-medium">${companyName}</h3>`,
        ),
        `missing experience company ${companyName}`,
      );
      assert.ok(
        body.includes(`>${jobTitle}</h4>`),
        `missing title ${jobTitle}`,
      );
      assert.ok(
        body.includes(`${startDate} to ${endDate}`),
        `missing date range ${startDate} to ${endDate} for ${companyName}`,
      );
    }

    for (const tag of TAGS) {
      assert.ok(
        body.includes(`<p class="text-sm">${tag}</p>`),
        `missing tag ${tag}`,
      );
    }

    const socialNav = /<nav aria-label="social links">([\s\S]*?)<\/nav>/.exec(
      body,
    )?.[1];
    assert.ok(socialNav !== undefined, 'missing social links nav');
    assert.equal(countMatches(socialNav, /<li>/g), SOCIAL_LINKS.length);
    for (const [name, href] of SOCIAL_LINKS) {
      assert.ok(
        socialNav.includes(`<a href="${href}"`),
        `missing social href ${href}`,
      );
      assert.ok(
        socialNav.includes(`<span>${name}</span>`),
        `missing social name ${name}`,
      );
    }

    assert.ok(
      body.includes(`href="${CALENDLY_HREF}"`),
      'missing Calendly link href',
    );
  });

  it('GET / renders the exact metadata and canonical URL', async () => {
    const { html } = await getHtml('/');

    assert.ok(html.includes(`<title>${TITLE}</title>`), 'title mismatch');
    assert.equal(readMeta(html, 'name', 'description'), DESCRIPTION);
    assert.equal(readMeta(html, 'name', 'author'), TITLE);
    assert.equal(readMeta(html, 'name', 'keywords'), KEYWORDS);

    /* Baseline declares the OG and Twitter tags with `property`. */
    assert.equal(readMeta(html, 'property', 'og:title'), TITLE);
    assert.equal(readMeta(html, 'property', 'og:description'), DESCRIPTION);
    assert.equal(readMeta(html, 'property', 'og:image'), OG_IMAGE);
    assert.equal(readMeta(html, 'property', 'og:url'), CANONICAL_URL);
    assert.equal(readMeta(html, 'property', 'og:type'), 'website');

    assert.equal(
      readMeta(html, 'property', 'twitter:card'),
      'summary_large_image',
    );
    assert.equal(readMeta(html, 'property', 'twitter:site'), '@beMendoza_');
    assert.equal(readMeta(html, 'property', 'twitter:title'), TITLE);
    assert.equal(
      readMeta(html, 'property', 'twitter:description'),
      DESCRIPTION,
    );
    assert.equal(readMeta(html, 'property', 'twitter:image'), OG_IMAGE);
    assert.equal(readMeta(html, 'property', 'twitter:image:alt'), IMAGE_ALT);

    assert.ok(
      html.includes(`<link rel="canonical" href="${CANONICAL_URL}"/>`),
      'canonical link must match https://bmendoza.io/ exactly',
    );
  });

  it('discovered stylesheets and preloaded font load with MIME and immutable caching', async () => {
    const { html } = await getHtml('/');

    const stylesheets = linkHrefs(html, (tag) => {
      return readAttr(tag, 'rel') === 'stylesheet';
    });
    const fonts = linkHrefs(html, (tag) => {
      return (
        readAttr(tag, 'rel') === 'preload' && readAttr(tag, 'as') === 'font'
      );
    });

    assert.equal(stylesheets.length, 2, 'expected 2 stylesheets');
    assert.equal(fonts.length, 1, 'expected 1 preloaded font');

    for (const href of stylesheets) {
      const response = await request(href);
      assert.equal(response.status, 200, `${href} should be 200`);
      assert.match(
        response.headers.get('content-type') ?? '',
        /^text\/css/,
        `${href} MIME type`,
      );
      assert.equal(
        response.headers.get('cache-control'),
        IMMUTABLE_CACHE_CONTROL,
        `${href} cache header`,
      );
    }

    for (const href of fonts) {
      const response = await request(href);
      assert.equal(response.status, 200, `${href} should be 200`);
      assert.equal(
        response.headers.get('content-type'),
        'font/woff2',
        `${href} MIME type`,
      );
      assert.equal(
        response.headers.get('cache-control'),
        IMMUTABLE_CACHE_CONTROL,
        `${href} cache header`,
      );
    }
  });

  it('favicon keeps its own cache header', async () => {
    const response = await request('/favicon.ico');

    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get('content-type'),
      'image/vnd.microsoft.icon',
    );
    assert.equal(response.headers.get('cache-control'), FAVICON_CACHE_CONTROL);
  });

  it('unknown route and unknown asset return 404, never 200', async () => {
    const missingRoute = await request('/missing-route-baseline-probe');
    assert.equal(missingRoute.status, 404, 'unknown route');
    assert.notEqual(missingRoute.status, 200);

    const { html } = await getHtml('/');
    const stylesheet = linkHrefs(html, (tag) => {
      return readAttr(tag, 'rel') === 'stylesheet';
    })[0];
    assert.ok(stylesheet !== undefined, 'no stylesheet to derive asset path');
    const missingAsset = new URL(
      `${stylesheet.replace(/[^/]+$/, '__missing-asset__.css')}`,
      BASE_URL,
    );
    const missingAssetResponse = await request(
      `${missingAsset.pathname}${missingAsset.search}`,
    );
    assert.equal(missingAssetResponse.status, 404, 'unknown asset');
  });

  it('HEAD / matches GET status and cache headers with an empty body', async () => {
    const get = await request('/');
    const head = await request('/', { method: 'HEAD' });

    assert.equal(head.status, get.status);
    assert.equal(
      head.headers.get('cache-control'),
      get.headers.get('cache-control'),
    );
    assert.equal(await head.text(), '');
  });

  it('unsupported methods on / return 405', async (t) => {
    const rows = [];

    for (const method of [...UNSUPPORTED_METHODS, ...EXTRA_METHODS]) {
      const response = await request('/', { method });
      const row = {
        method,
        status: response.status,
        allow: response.headers.get('allow'),
        cacheControl: response.headers.get('cache-control'),
        contract: UNSUPPORTED_METHODS.includes(method),
      };
      rows.push(row);
      if (row.contract) {
        assert.equal(response.status, 405, `${method} / should be 405`);
      }
      await response.arrayBuffer();
    }

    t.diagnostic(
      `method/status/allow/cache-control table:\n${rows
        .map(
          (row) =>
            `  ${row.method.padEnd(7)} status=${row.status} allow=${row.allow ?? '<none>'} cache-control=${row.cacheControl ?? '<none>'}${row.contract ? '' : ' (recorded only)'}`,
        )
        .join('\n')}`,
    );
  });
});
