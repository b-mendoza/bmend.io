import { Tag } from '~/components/tag';
import { cn } from '~/utils/cn';

type TagMapperProps<T> = Readonly<{
  getTagId: (tag: T) => string;
  getTagName: (tag: T) => string;
  tags: T[];
  tagClassName?: string;
  tagsWrapperClassName?: string;
}>;

export const TagMapper = <Tag,>(props: TagMapperProps<Tag>) => {
  const { getTagId, getTagName, tags, tagClassName, tagsWrapperClassName } =
    props;

  return (
    <ul className={cn('flex flex-wrap gap-[0.8rem]', tagsWrapperClassName)}>
      {tags.map((tag) => (
        <Tag
          className={tagClassName}
          key={getTagId(tag)}
          name={getTagName(tag)}
        />
      ))}
    </ul>
  );
};
