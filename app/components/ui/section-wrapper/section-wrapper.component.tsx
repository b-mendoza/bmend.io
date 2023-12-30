import { cn } from '~/utils/cn';
import { createElement } from 'react';

type SupportedTags = keyof Pick<
  React.JSX.IntrinsicElements,
  'footer' | 'header' | 'section'
>;

type SectionWrapperProps<T extends SupportedTags> =
  React.JSX.IntrinsicElements[T] & Readonly<{ as: T }>;

export const SectionWrapper = <T extends SupportedTags>(
  props: SectionWrapperProps<T>,
) => {
  const { as, className, ...restOfProps } = props;

  return createElement(as, {
    className: cn(
      'mx-4 my-4 rounded-[2rem] border-[0.1rem] border-solid border-section-border/10 px-8 py-16',
      className,
    ),
    ...restOfProps,
  });
};
