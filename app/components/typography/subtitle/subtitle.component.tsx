import type { ParagraphProps } from '~/components/typography/paragraph';
import { Paragraph } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

type SubtitleProps = ParagraphProps;

export const Subtitle = (props: SubtitleProps) => {
  const { className, ...restOfProps } = props;

  return (
    <Paragraph
      className={cn('font-semibold uppercase', className)}
      {...restOfProps}
    />
  );
};
