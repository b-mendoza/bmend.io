import { cn } from '~/utils/cn';

type Size = 'sm' | 'md' | 'lg';

export const PARAGRAPH_SIZES = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
} satisfies Record<Size, string>;

export type ParagraphProps = React.JSX.IntrinsicElements['p'] &
  Readonly<{
    /**
     * The variant of the paragraph to render.
     * @default 'md'
     */
    size?: Size;
  }>;

export const Paragraph = (props: ParagraphProps) => {
  const { className, size = 'md', ...restOfProps } = props;

  return (
    <p {...restOfProps} className={cn(PARAGRAPH_SIZES[size], className)} />
  );
};
