/* import type { OutgoingHttpHeaders } from 'http'; */
import type {
  /* HeadersFunction, */ MetaFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Image } from '@unpic/react';
import { ExperienceCard } from '~/components/experience-card';
import { Link } from '~/components/link';
import { TagMapper } from '~/components/tag-mapper';
import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import { Subtitle } from '~/components/typography/subtitle';
import { SectionWrapper } from '~/components/ui/section-wrapper';
import { WhiteLink } from '~/components/white-link';
/* import { getDaysInSeconds } from '~/utils/dates.server'; */
/* import { useState } from 'react'; */
import { getJobExperience } from './get-job-experience.server';
import { getSocialLinks } from './get-social-links.server';
import { getTags } from './get-tags.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Bryan M. | Portfolio' },
    /* { name: 'description', content: 'Welcome to Remix!' }, */
  ];
};

/* export const headers: HeadersFunction = ({ loaderHeaders }) => {
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
}; */

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
      className={`flex items-center justify-between gap-6 py-6 ${SECTION_BACKGROUND}`}
    >
      <Image
        alt="a close up of a dog on a leash with its mouth open and tongue out and tongue hanging out"
        background="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoKAAoAAsBIJZgCdADdRgtoKgAA+x9TzrhmneVUADrUlEIDsYAn07bIUZi1YcqntHT03os/Wv6jCDX1zksOu7tWzZQNug0AAAA="
        cdn="cloudinary"
        className="rounded-full"
        height={40}
        layout="fixed"
        priority
        src="https://res.cloudinary.com/dgqif0kkr/image/upload/c_fill,h_40,w_40/q_auto:best/fl_progressive:steep/bmendoza-io/sm8a1hhpi7wjua4upya1.jpg"
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
    <div className="mx-auto flex max-w-[68rem] flex-col gap-4 text-white">
      <Header />

      <SectionWrapper className={SECTION_BACKGROUND}>
        <Subtitle className="mb-12">About</Subtitle>

        <Heading className="mb-8 font-medium" size="sm" variant="h1">
          Senior Software Engineer
        </Heading>

        <Paragraph className="mb-16 text-balance">
          I am a highly skilled developer with 6 years of experience building
          high-quality applications for small and medium-sized businesses. I am
          passionate about creating exceptional user experiences and ensuring
          accessibility with expertise in modern tools like React, Next.js, and
          Remix.
        </Paragraph>

        <TagMapper
          getTagId={(tag) => tag.id}
          getTagName={(tag) => tag.text}
          /* getIconName={(tag) => tag.icon} */
          tags={loaderData.tags}
        />
      </SectionWrapper>

      <SectionWrapper
        className={`flex flex-col gap-[3.6rem] ${SECTION_BACKGROUND}`}
      >
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

      <SectionWrapper className="border-white/20 bg-gradient-to-bl from-[hsl(243_100%_68%)] to-[hsl(243_76%_51%)] px-0">
        <Image
          alt="a close up of a dog on a leash with its mouth open and tongue out and tongue hanging out"
          cdn="cloudinary"
          className="mx-auto mb-10 rounded-full"
          height={115}
          layout="fixed"
          src="https://res.cloudinary.com/dgqif0kkr/image/upload/c_fill,h_115,w_115/q_auto:best/fl_progressive:steep/bmendoza-io/sm8a1hhpi7wjua4upya1.jpg"
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
  );
}
