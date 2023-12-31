import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';
import type { JobExperience } from '~/models/get-job-experience.server';

type ExperienceCardProps = Readonly<JobExperience>;

export const ExperienceCard = (props: ExperienceCardProps) => {
  const { companyName, description, jobTitle, startDate, endDate } = props;

  return (
    <article>
      <Paragraph className="mb-8 text-texts/70">
        {startDate} - {endDate ?? 'Present'}
      </Paragraph>

      <Heading variant="h2" size="sm" className="mb-[0.2rem] font-medium">
        {companyName}
      </Heading>

      <Paragraph className="mb-8 text-texts/50">{jobTitle}</Paragraph>

      <Paragraph className="whitespace-pre-wrap text-pretty">
        {description}
      </Paragraph>
    </article>
  );
};
