/* TODO: adjust the font-size values as they seem not to be correct */

import { createElement } from 'react';

import { cn } from '~/utils/cn';

type Variant = keyof Pick<React.ReactHTML, 'h1' | 'h2' | 'h3'>;

type Size = 'sm' | 'md' | 'lg';

const BASE_CLASS_NAMES = {
  h1: 'scroll-m-20 tracking-tight',
  h2: 'scroll-m-20 tracking-tight first:mt-0',
  h3: 'scroll-m-20 tracking-tight',
} satisfies Record<Variant, string>;

export const HEADING_SIZES = {
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
} satisfies Record<Variant, Record<Size, string>>;

type HeadingProps<T extends Variant> = React.JSX.IntrinsicElements[T] &
  Readonly<{
    /**
     * The variant of the heading to render.
     */
    variant: T;
    /**
     * The size of the heading to render.
     * @default "md"
     */
    size?: Size;
  }>;

export const Heading = <HeadingVariant extends Variant>(
  props: HeadingProps<HeadingVariant>,
) => {
  const { children, variant, className, size = 'md', ...restOfProps } = props;

  return createElement(
    variant,
    {
      ...restOfProps,
      className: cn(
        BASE_CLASS_NAMES[variant],
        HEADING_SIZES[variant][size],
        className,
      ),
    },
    children,
  );
};
