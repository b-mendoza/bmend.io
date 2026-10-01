import { Paragraph } from "~/components/typography/paragraph/paragraph.component";

type TagListProps = Readonly<{ tags: Array<{ text: string }> }>;

export const TagList = (props: TagListProps) => {
  const { tags } = props;

  return (
    <ul className="flex flex-wrap gap-[0.8rem]">
      {tags.map((tag, idx) => (
        <li
          className="flex h-12 items-center gap-2 rounded-[2rem] bg-block-background-1/[0.15] px-4 py-[0.4rem]"
          key={idx}
        >
          <Paragraph size="sm">{tag.text}</Paragraph>
        </li>
      ))}
    </ul>
  );
};
