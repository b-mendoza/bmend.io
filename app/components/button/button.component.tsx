import { PARAGRAPH_SIZES } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

export type ButtonProps = React.JSX.IntrinsicElements['button'];

export const Button = (props: ButtonProps) => {
  const { children, className, type = 'button' } = props;

  return (
    <button
      {...props}
      className={cn(
        'rounded-2xl border-[0.1rem] border-texts px-[2.2rem] py-[1.4rem] font-medium hover:bg-button-hover-background hover:text-button-hover-text',
        PARAGRAPH_SIZES.lg,
        className,
      )}
      type={type}
    >
      <span>{children}</span>
    </button>
  );
};
