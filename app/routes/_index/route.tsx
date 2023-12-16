import { json } from '@remix-run/node';
import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import { getTags } from './get-tags.server';
import { useLoaderData } from '@remix-run/react';
import { Subtitle } from '~/components/typography/subtitle';
import { getJobExperience } from './get-job-experience.server';
import { SectionWrapper } from '~/components/ui/section-wrapper';
import { TagMapper } from '~/components/tag-mapper';
import { ExperienceCard } from '~/components/experience-card';
import { WhiteButton } from '~/components/white-button';
import { Link } from '~/components/link';
import { getSocialLinks } from './get-social-links.server';

export const loader = () =>
  json({
    jobExperience: getJobExperience(),
    socialLinks: getSocialLinks(),
    tags: getTags(),
  });

export default function HomeIndexRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 text-white">
      <SectionWrapper>
        <Subtitle className="mb-12">About</Subtitle>

        <Heading variant="h1" size="sm" className="mb-8 font-medium">
          User Experience Architect & Design Innovator
        </Heading>

        <Paragraph className="mb-16">
          In my 8 years of experience, I have completed 50 successful projects.
          I embrace a holistic approach to design thinking, specializing in
          precise implementation
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
  );
}
