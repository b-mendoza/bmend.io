import { cn } from '~/utils/cn';

type Size = 'sm' | 'md' | 'lg';

export const PARAGRAPH_SIZES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export type ParagraphProps = Readonly<
  React.JSX.IntrinsicElements['p'] & {
    /**
     * The variant of the paragraph to render.
     * @default 'md'
     */
    size?: Size;
  }
>;

export const Paragraph = (props: ParagraphProps) => {
  const { className, size = 'md', ...restOfProps } = props;

  return (
    <p className={cn(PARAGRAPH_SIZES[size], className)} {...restOfProps} />
  );
};
