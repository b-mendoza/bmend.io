import type { OutgoingHttpHeaders } from 'http';
import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { Image } from '@unpic/react';
import geistMediumFont from '~/assets/fonts/geist-medium.woff2';
import geistRegularFont from '~/assets/fonts/geist-regular.woff2';
import geistSemiboldFont from '~/assets/fonts/geist-semibold.woff2';
import { ExperienceCard } from '~/components/experience-card';
import { Link } from '~/components/link';
import { TagMapper } from '~/components/tag-mapper';
import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import { Subtitle } from '~/components/typography/subtitle';
import { SectionWrapper } from '~/components/ui/section-wrapper';
import { WhiteButton } from '~/components/white-button';
import fontStyles from '~/styles/fonts.styles.css';
import globalStyles from '~/styles/globals.styles.css';
import { getDaysInSeconds } from '~/utils/get-days-in-seconds.server';
import { getJobExperience } from '~/utils/get-job-experience.server';
import { getSocialLinks } from '~/utils/get-social-links.server';
import { getTags } from '~/utils/get-tags.server';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: geistRegularFont,
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      rel: 'preload',
      href: geistMediumFont,
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      rel: 'preload',
      href: geistSemiboldFont,
      as: 'font',
      crossOrigin: 'anonymous',
      type: 'font/woff2',
    },
    {
      as: 'style',
      rel: 'preload',
      href: fontStyles,
    },
    {
      as: 'style',
      rel: 'preload',
      href: globalStyles,
    },
    {
      rel: 'stylesheet',
      href: fontStyles,
    },
    {
      rel: 'stylesheet',
      href: globalStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Bryan M. | Portfolio' },
    // { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const loaderCacheControlPolicy = loaderHeaders.get('cache-control');

  if (typeof loaderCacheControlPolicy === 'string') {
    return {
      'cache-control': loaderCacheControlPolicy,
    };
  }

  return {
    'cache-control': `max-age=${getDaysInSeconds(
      1,
    )}, stale-while-revalidate=${getDaysInSeconds(7)}`,
  } satisfies OutgoingHttpHeaders;
};

export const loader = () => {
  return json({
    jobExperience: getJobExperience(),
    socialLinks: getSocialLinks(),
    tags: getTags(),
  });
};

export default function HomeLayoutRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background p-4 text-white">
        <div className="flex flex-col gap-4 text-white">
          <SectionWrapper>
            <Subtitle className="mb-12">About</Subtitle>

            <Heading className="mb-8 font-medium" size="sm" variant="h1">
              User Experience Architect & Design Innovator
            </Heading>

            <Paragraph className="mb-16">
              In my 8 years of experience, I have completed 50 successful
              projects. I embrace a holistic approach to design thinking,
              specializing in precise implementation
            </Paragraph>

            <TagMapper
              getTagId={(tag) => tag.id}
              getTagName={(tag) => tag.text}
              tags={loaderData.tags}
            />
          </SectionWrapper>

          <SectionWrapper className="flex flex-col gap-[3.6rem]">
            <Subtitle>Experience</Subtitle>

            {loaderData.jobExperience.map((jobExperience) => (
              <ExperienceCard
                companyName={jobExperience.companyName}
                description={jobExperience.description}
                jobTitle={jobExperience.jobTitle}
                key={jobExperience.id}
                timePeriod={jobExperience.timePeriod}
              />
            ))}
          </SectionWrapper>

          <SectionWrapper className="border-white/20 bg-gradient-to-br from-[hsl(243_100%_68%)] to-[hsl(243_76%_51%)] px-0">
            <Image
              alt="a close up of a dog on a leash with its mouth open and tongue out and tongue hanging out"
              background="https://res.cloudinary.com/dgqif0kkr/image/upload/c_fit,h_115,w_115/q_1/e_blur:2000/f_webp/bmendoza-io/sm8a1hhpi7wjua4upya1.jpg"
              cdn="cloudinary"
              className="mx-auto mb-10 rounded-full"
              height={115}
              layout="fixed"
              src="https://res.cloudinary.com/dgqif0kkr/image/upload/q_auto:best/c_fit,h_115,w_115/f_webp/bmendoza-io/sm8a1hhpi7wjua4upya1.jpg"
              width={115}
            />

            <Paragraph className="mb-6 text-center text-white/80">
              John Cameron
            </Paragraph>

            <div className="mx-8 mb-12">
              <Heading
                className="mb-12 text-center font-medium"
                size="lg"
                variant="h2"
              >
                Let&apos;s talk about your project
              </Heading>

              <WhiteButton className="w-full">Book a call</WhiteButton>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-12 border-t-[0.1rem] border-t-texts/[0.15] px-8 pt-12">
              {loaderData.socialLinks.map((socialLink) => (
                <li key={socialLink.id}>
                  <Link isExternal href={socialLink.to}>
                    {socialLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionWrapper>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
