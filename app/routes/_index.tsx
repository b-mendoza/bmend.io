import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Image } from '@unpic/react';
import type { OutgoingHttpHeaders } from 'http';

import { ExperienceCard } from '~/components/experience-card';
import { Link } from '~/components/link';
import { TagMapper } from '~/components/tag-mapper';
import { Heading } from '~/components/typography/headings';
import { Paragraph, PARAGRAPH_SIZES } from '~/components/typography/paragraph';
import { Subtitle } from '~/components/typography/subtitle';
import { SectionWrapper } from '~/components/ui/section-wrapper';
import { WhiteLink } from '~/components/white-link';
/* import { useState } from 'react'; */
import { getJobExperience } from '~/models/get-job-experience.server';
import { getSocialLinks } from '~/models/get-social-links.server';
import { getTags } from '~/models/get-tags.server';
import { cn } from '~/utils/cn';
import { getDaysInSeconds } from '~/utils/dates.server';

const PAGE_METADATA = {
  CanonicalURL: 'https://bmendoza.io/',
  Title: 'Bryan Mendoza',
  Description:
    'Your experienced web developer with nearly seven years of experience crafting tailored and accessible apps to skyrocket your success, using React, Next.js, and Remix.',
  Image: {
    alt: 'a person holding a dog in front of a mirror with his head tilted to the side and his eyes wide open',
    src: 'https://res.cloudinary.com/dgqif0kkr/image/upload/q_auto,f_auto/bmendoza-io/shiba-inu.jpg',
  },
};

export const meta: MetaFunction = () => {
  /* TODO: update <meta /> tags text content */
  return [
    { title: PAGE_METADATA.Title },
    {
      name: 'description',
      content: PAGE_METADATA.Description,
    },
    {
      property: 'og:title',
      content: PAGE_METADATA.Title,
    },
    {
      property: 'og:description',
      content: PAGE_METADATA.Description,
    },
    {
      property: 'og:image',
      content: PAGE_METADATA.Image.src,
    },
    {
      property: 'og:url',
      content: PAGE_METADATA.CanonicalURL,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:site',
      content: '@beMendoza_',
    },
    {
      property: 'twitter:title',
      content: PAGE_METADATA.Title,
    },
    {
      property: 'twitter:description',
      content: PAGE_METADATA.Description,
    },
    {
      property: 'twitter:image',
      content: PAGE_METADATA.Image.src,
    },
    {
      property: 'twitter:image:alt',
      content: PAGE_METADATA.Image.alt,
    },
    {
      name: 'author',
      content: 'Bryan Mendoza',
    },
    {
      name: 'keywords',
      content:
        'Experienced Developer, JavaScript, TypeScript, React, Remix, Next.js, Tailwind CSS, Node.js, GraphQL, Web Applications, Front-End Development, Back-End Development, Full-Stack Expertise, Responsive Design, Modern Web Technologies, User Experience, Web Accessibility, Application Development',
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'canonical',
      href: PAGE_METADATA.CanonicalURL,
    },
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
    'cache-control': `max-age=60, stale-while-revalidate=${getDaysInSeconds(
      1,
    )}`,
  } satisfies OutgoingHttpHeaders;
};

export const loader = () => {
  return json({
    jobExperience: getJobExperience(),
    socialLinks: getSocialLinks(),
    tags: getTags(),
  });
};

const SECTION_BACKGROUND =
  'bg-gradient-to-tr from-section-background-bottom to-section-background-top';

const Header = () => {
  /* const [isMenuOpen, setIsMenuOpen] = useState(false); */

  /* const handleMenuIconPress = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }; */

  return (
    <SectionWrapper
      as="header"
      className={cn(
        'sticky top-4 flex items-center justify-between gap-6 rounded-2xl py-6',
        SECTION_BACKGROUND,
      )}
    >
      <Image
        alt={PAGE_METADATA.Image.alt}
        cdn="cloudinary"
        className="rounded-full"
        height={40}
        layout="fixed"
        priority
        src="https://res.cloudinary.com/dgqif0kkr/image/upload/q_auto/bmendoza-io/shiba-inu.jpg"
        width={40}
      />

      <Heading
        className="mr-auto text-[2rem] font-medium"
        size="sm"
        variant="h2"
      >
        Bryan Mendoza
      </Heading>

      {/* <RootToggle
        aria-label="Open menu"
        pressed={isMenuOpen}
        onPressedChange={handleMenuIconPress}
      >
        <Icon name={isMenuOpen ? 'x' : 'menu-2'} height={30} width={30} />
      </RootToggle> */}
    </SectionWrapper>
  );
};

export default function IndexHomeRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-[68rem] text-white">
      <Header />

      <main>
        <SectionWrapper as="section" className={SECTION_BACKGROUND}>
          <Subtitle className="mb-12">About</Subtitle>

          <Heading className="mb-8 font-semibold" size="sm" variant="h1">
            Senior Software Engineer
          </Heading>

          <Paragraph className="mb-16 text-balance">
            I am a highly skilled developer with nearly seven years of
            experience building high-quality applications for small to
            medium-sized businesses. My passion lies in working with
            cutting-edge technology while I commit to creating accessible and
            exceptional user experiences.
          </Paragraph>

          <TagMapper
            getTagName={(tag) => tag.text}
            /* getIconName={(tag) => tag.icon} */
            tags={loaderData.tags}
          />
        </SectionWrapper>

        <SectionWrapper
          as="section"
          className={cn('flex flex-col gap-[3.6rem]', SECTION_BACKGROUND)}
        >
          <Heading
            className={cn('font-semibold uppercase', PARAGRAPH_SIZES.md)}
            size="sm"
            variant="h2"
          >
            Experience
          </Heading>

          {loaderData.jobExperience.map((jobExperience, idx) => (
            <ExperienceCard {...jobExperience} key={idx} />
          ))}
        </SectionWrapper>
      </main>

      <SectionWrapper
        as="footer"
        className="border-white/20 bg-gradient-to-bl from-[hsl(243_100%_68%)] to-[hsl(243_76%_51%)] px-0"
      >
        <Image
          alt={PAGE_METADATA.Image.alt}
          cdn="cloudinary"
          className="mx-auto mb-10 rounded-full"
          height={115}
          layout="fixed"
          src="https://res.cloudinary.com/dgqif0kkr/image/upload/q_auto/bmendoza-io/shiba-inu.jpg"
          width={115}
        />

        <Paragraph className="mb-6 text-center text-white/80">
          Bryan Mendoza
        </Paragraph>

        <div className="mx-8 mb-12">
          <Heading
            className="mb-12 text-balance text-center font-medium"
            size="lg"
            variant="h2"
          >
            Let&apos;s talk about your project
          </Heading>

          <WhiteLink
            className="flex w-full items-center justify-center"
            isExternal
            href="https://calendly.com/bmendoza-dev/30-minute-chat-with-bryan-mendoza"
          >
            Book a call
          </WhiteLink>
        </div>

        <nav aria-label="social links">
          <ul className="flex flex-wrap items-center justify-center gap-12 border-t-[0.1rem] border-t-texts/[0.15] px-8 pt-12">
            {loaderData.socialLinks.map((socialLink, idx) => (
              <li key={idx}>
                <Link isExternal href={socialLink.to}>
                  {socialLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SectionWrapper>
    </div>
  );
}
