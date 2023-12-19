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
  'gatsby',
  'git',
  'graphql',
  'html5',
  'javascript',
  'jest',
  'menu-2',
  'nextdotjs',
  'nodedotjs',
  'postgresql',
  'prisma',
  'react',
  'redux',
  'remix',
  'sass',
  'storybook',
  'tailwindcss',
  'testinglibrary',
  'typescript',
  'x',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
