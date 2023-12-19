import href from './icon.svg';

export { href };

type IconProps = React.JSX.IntrinsicElements['svg'] & {
  readonly name: IconName;
};

export const Icon = (props: IconProps) => {
  const { name, ...restOfProps } = props;

  return (
    <svg {...restOfProps}>
      <use href={`${href}#${name}`} />
    </svg>
  );
};

const ICON_NAMES = [
  'bars-3',
  'css',
  'gatsby',
  'git',
  'graphql',
  'html5',
  'javascript',
  'jest',
  'mysql',
  'nextjs',
  'nodejs',
  'postgresql',
  'prisma_dark',
  'react',
  'redux',
  'remix',
  'sass',
  'sqlite',
  'storybook',
  'tailwindcss',
  'testing-library',
  'typescript',
  'x-mark',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
