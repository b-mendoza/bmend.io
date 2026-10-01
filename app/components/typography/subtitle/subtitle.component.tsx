import type { ParagraphProps } from "~/components/typography/paragraph/paragraph.component";
import { Paragraph } from "~/components/typography/paragraph/paragraph.component";
import { cn } from "~/utils/cn";

type SubtitleProps = ParagraphProps;

export const Subtitle = (props: SubtitleProps) => {
  const { className } = props;

  return (
    <Paragraph
      {...props}
      className={cn("font-semibold uppercase", className)}
    />
  );
};
