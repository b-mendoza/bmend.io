import { Paragraph } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

export type ButtonProps = React.JSX.IntrinsicElements['button'];

export const Button = (props: ButtonProps) => {
  const { children, className, type = 'button', ...restOfProps } = props;

  return (
    <button
      className={cn(
        'rounded-2xl border-[0.1rem] border-texts px-[2.2rem] py-[1.4rem] font-medium hover:bg-button-hover-background hover:text-button-hover-text',
        className,
      )}
      type={type}
      {...restOfProps}
    >
      <Paragraph size="lg">{children}</Paragraph>
    </button>
  );
};
