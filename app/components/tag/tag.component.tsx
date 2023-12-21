import type { IconName, IconSize } from '~/components/icon';
import { Icon } from '~/components/icon';
import { Paragraph } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

const DEFAULT_ICON_SIZE: IconSize = {
  height: 20,
  width: 20,
};

type TagProps = Pick<React.JSX.IntrinsicElements['li'], 'className'> &
  Readonly<{
    name: string;
    icon?: IconName;
  }>;

const CUSTOM_ICON_SIZES = {
  javascript: {
    height: 18,
    width: 18,
  },
  remix: {
    height: 16,
    width: 16,
  },
  tailwindcss: {
    height: 22,
    width: 22,
  },
  typescript: {
    height: 18,
    width: 18,
  },
} satisfies Partial<Record<IconName, IconSize>>;

const hasCustomSize = (
  iconName: IconName | undefined,
): iconName is keyof typeof CUSTOM_ICON_SIZES => {
  if (iconName == null) return false;

  return iconName in CUSTOM_ICON_SIZES;
};

export const Tag = (props: TagProps) => {
  const { name, className, icon: iconName } = props;

  const iconSize = hasCustomSize(iconName)
    ? CUSTOM_ICON_SIZES[iconName]
    : DEFAULT_ICON_SIZE;

  return (
    <li
      className={cn(
        'flex h-12 items-center gap-2 rounded-[2rem] bg-block-background-1/[0.15] px-4 py-[0.4rem]',
        className,
      )}
    >
      <Paragraph size="sm">{name}</Paragraph>

      {typeof iconName === 'string' ? (
        <Icon className="fill-white" name={iconName} {...iconSize} />
      ) : null}
    </li>
  );
};
