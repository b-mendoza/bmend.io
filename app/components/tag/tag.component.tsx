import type { IconName } from '~/components/icon';
import { Icon } from '~/components/icon';
import { Paragraph } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

type TagProps = Pick<React.JSX.IntrinsicElements['li'], 'className'> &
  Readonly<{
    name: string;
    icon?: IconName;
  }>;

export const Tag = (props: TagProps) => {
  const { name, className, icon: iconName } = props;

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-[2rem] bg-block-background-1/[0.15] px-4 py-[0.4rem]',
        className,
      )}
    >
      <Paragraph size="sm">{name}</Paragraph>

      {typeof iconName === 'string' ? (
        <Icon className="fill-white" name={iconName} height={20} width={20} />
      ) : null}
    </li>
  );
};
