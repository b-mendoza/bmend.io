import { cn } from '~/utils/cn';
import href from './icon.svg';

export { href };

type IconProps = React.JSX.IntrinsicElements['svg'] & {
  readonly name: IconName;
};

export const Icon = (props: IconProps) => {
  const { name, className, ...restOfProps } = props;

  return (
    <svg className={cn('inline self-center', className)} {...restOfProps}>
      <use href={`${href}#${name}`} />
    </svg>
  );
};

const ICON_NAMES = [
  'css3',
  'git',
  'graphql',
  'html5',
  'javascript',
  'menu-2',
  'nextdotjs',
  'nodedotjs',
  'postgresql',
  'react',
  'redux',
  'remix',
  'tailwindcss',
  'typescript',
  'x',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
