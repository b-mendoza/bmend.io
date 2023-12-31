import { Heading } from '~/components/typography/headings';
import { Paragraph, PARAGRAPH_SIZES } from '~/components/typography/paragraph';
import type { JobExperience } from '~/models/get-job-experience.server';
import { cn } from '~/utils/cn';

type ExperienceCardProps = Readonly<JobExperience>;

export const ExperienceCard = (props: ExperienceCardProps) => {
  const { companyName, description, jobTitle, startDate, endDate } = props;

  return (
    <article>
      <Paragraph className="mb-8 text-texts/70" size="sm">
        {startDate} to {endDate ?? 'Present'}
      </Paragraph>

      <Heading variant="h3" size="lg" className="mb-[0.2rem] font-medium">
        {companyName}
      </Heading>

      <h4 className={cn('mb-8 text-texts/50', PARAGRAPH_SIZES.md)}>
        {jobTitle}
      </h4>

      <Paragraph className="whitespace-pre-wrap text-pretty">
        {description}
      </Paragraph>
    </article>
  );
};
