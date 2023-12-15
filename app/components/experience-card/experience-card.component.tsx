import { Heading } from '~/components/typography/headings';
import { Paragraph } from '~/components/typography/paragraph';

type ExperienceCardProps = Readonly<{
  companyName: string;
  description: string;
  timePeriod: string;
  jobTitle: string;
}>;

export const ExperienceCard = (props: ExperienceCardProps) => {
  const { companyName, description, timePeriod, jobTitle } = props;

  return (
    <article>
      <Paragraph className="mb-8 text-texts/70">{timePeriod}</Paragraph>

      <Heading variant="h2" size="sm" className="mb-[0.2rem] font-medium">
        {companyName}
      </Heading>

      <Paragraph className="mb-8 text-texts/50">{jobTitle}</Paragraph>

      <Paragraph>{description}</Paragraph>
    </article>
  );
};
