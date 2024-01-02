import { cn } from '~/utils/cn';

import href from './icon.svg';

export { href };

export type IconProps = React.JSX.IntrinsicElements['svg'] &
  Readonly<{ name: IconName }>;

export type IconSize = Pick<IconProps, 'height' | 'width'>;

export const Icon = (props: IconProps) => {
  const { name, className } = props;

  return (
    <svg {...props} className={cn('inline self-center', className)}>
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
