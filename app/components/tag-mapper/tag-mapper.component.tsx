import { Tag } from "~/components/tag/tag.component";
import { cn } from "~/utils/cn";

type TagMapperProps<T> = Readonly<{
  getTagName: (tag: T) => string;
  tags: T[];
  tagClassName?: string;
  tagsWrapperClassName?: string;
}>;

export const TagMapper = <Tag,>(props: TagMapperProps<Tag>) => {
  const { getTagName, tags, tagClassName, tagsWrapperClassName } = props;

  return (
    <ul className={cn("flex flex-wrap gap-[0.8rem]", tagsWrapperClassName)}>
      {tags.map((tag, idx) => {
        return (
          <Tag className={tagClassName} key={idx} name={getTagName(tag)} />
        );
      })}
    </ul>
  );
};
