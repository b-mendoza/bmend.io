import { Paragraph } from "~/components/typography/paragraph/paragraph.component";
import { cn } from "~/utils/cn";

type TagProps = Pick<React.JSX.IntrinsicElements["li"], "className"> &
  Readonly<{
    name: string;
  }>;

export const Tag = (props: TagProps) => {
  const { name, className } = props;

  return (
    <li
      className={cn(
        "flex h-12 items-center gap-2 rounded-[2rem] bg-block-background-1/[0.15] px-4 py-[0.4rem]",
        className,
      )}
    >
      <Paragraph size="sm">{name}</Paragraph>
    </li>
  );
};
