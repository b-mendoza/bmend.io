import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import type { JobExperience } from '~/routes/_index/get-job-experience.server';

type ExperienceCardProps = Readonly<Omit<JobExperience, 'id'>>;

export const ExperienceCard = (props: ExperienceCardProps) => {
  const { companyName, description, timePeriod, jobTitle } = props;

  return (
    <article>
      <Paragraph className="mb-8 text-texts/70">{timePeriod}</Paragraph>

      <Heading variant="h2" size="sm" className="mb-[0.2rem] font-medium">
        {companyName}
      </Heading>

      <Paragraph className="mb-8 text-texts/50">{jobTitle}</Paragraph>

      <Paragraph className="whitespace-pre-wrap text-balance">
        {description}
      </Paragraph>
    </article>
  );
};
