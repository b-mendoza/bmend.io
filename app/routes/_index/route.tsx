import { json } from '@remix-run/node';
import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import { getTags } from './get-tags.server';
import { useLoaderData } from '@remix-run/react';
import { Subtitle } from '~/components/typography/subtitle';
import { getExperience } from './get-experience.server';
import { SectionWrapper } from '~/components/ui/section-wrapper';
import { TagMapper } from '~/components/tag-mapper';
import { ExperienceCard } from '~/components/experience-card';

export const loader = () => {
  const tags = getTags();
  const jobExperienceList = getExperience();

  return json({
    jobExperienceList,
    tags,
  });
};

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

        {loaderData.jobExperienceList.map((jobExperience) => (
          <ExperienceCard
            companyName={jobExperience.companyName}
            description={jobExperience.description}
            jobTitle={jobExperience.jobTitle}
            key={jobExperience.id}
            timePeriod={jobExperience.timePeriod}
          />
        ))}
      </SectionWrapper>

      <SectionWrapper></SectionWrapper>
    </div>
  );
}
