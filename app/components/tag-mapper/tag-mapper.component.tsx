import type { IconName } from '~/components/icon';
import { Tag } from '~/components/tag';
import { cn } from '~/utils/cn';

type TagMapperProps<T> = Readonly<{
  getTagId: (tag: T) => string;
  getTagName: (tag: T) => string;
  tags: T[];
  getIconName?: (tag: T) => IconName | undefined;
  tagClassName?: string;
  tagsWrapperClassName?: string;
}>;

export const TagMapper = <Tag,>(props: TagMapperProps<Tag>) => {
  const {
    getTagId,
    getTagName,
    tags,
    getIconName,
    tagClassName,
    tagsWrapperClassName,
  } = props;

  return (
    <ul className={cn('flex flex-wrap gap-[0.8rem]', tagsWrapperClassName)}>
      {tags.map((tag) => {
        return (
          <Tag
            className={tagClassName}
            key={getTagId(tag)}
            name={getTagName(tag)}
            icon={getIconName?.(tag)}
          />
        );
      })}
    </ul>
  );
};
