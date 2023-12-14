import { cn } from '~/utils/cn';

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASS_NAMES: Record<Size, string> = {
  lg: 'text-lg',
  md: 'text-md',
  sm: 'text-sm',
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
    <p className={cn(SIZE_CLASS_NAMES[size], className)} {...restOfProps} />
  );
};
