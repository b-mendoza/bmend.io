/* import type { IconName } from '~/components/icon'; */
import { Tag } from '~/components/tag';
import { cn } from '~/utils/cn';

type TagMapperProps<T> = Readonly<{
  getTagName: (tag: T) => string;
  tags: T[];
  /* getIconName?: (tag: T) => IconName | undefined; */
  tagClassName?: string;
  tagsWrapperClassName?: string;
}>;

export const TagMapper = <Tag,>(props: TagMapperProps<Tag>) => {
  const {
    getTagName,
    tags,
    /* getIconName, */
    tagClassName,
    tagsWrapperClassName,
  } = props;

  return (
    <ul className={cn('flex flex-wrap gap-[0.8rem]', tagsWrapperClassName)}>
      {tags.map((tag, idx) => {
        return (
          <Tag
            className={tagClassName}
            key={idx}
            name={getTagName(tag)}
            /* icon={getIconName?.(tag)} */
          />
        );
      })}
    </ul>
  );
};
