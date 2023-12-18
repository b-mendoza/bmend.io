import { cn } from '~/utils/cn';
import { createElement } from 'react';

type Variant = keyof Pick<React.ReactHTML, 'h1' | 'h2' | 'h3'>;

type Size = 'sm' | 'md' | 'lg';

const HEADING_SIZES: Record<Variant, Record<Size, string>> = {
  h1: {
    sm: 'text-[3.1rem]',
    md: 'text-[3.8rem]',
    lg: 'text-[4.8rem]',
  },
  h2: {
    sm: 'text-[2.2rem]',
    md: 'text-[2.7rem]',
    lg: 'text-[3.4rem]',
  },
  h3: {
    sm: 'text-[1.8rem]',
    md: 'text-[2rem]',
    lg: 'text-[2.2rem]',
  },
};

type HeadingProps<T extends Variant> = Readonly<
  React.JSX.IntrinsicElements[T] & {
    /**
     * The variant of the heading to render.
     */
    variant: T;
    /**
     * The size of the heading to render.
     * @default "md"
     */
    size?: Size;
  }
>;

export const Heading = <HeadingVariant extends Variant>(
  props: HeadingProps<HeadingVariant>,
) => {
  const { children, variant, className, size = 'md', ...restOfProps } = props;

  return createElement(
    variant,
    {
      ...restOfProps,
      className: cn(HEADING_SIZES[variant][size], className),
    },
    children,
  );
};
