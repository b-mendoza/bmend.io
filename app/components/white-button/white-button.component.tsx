import { Button } from '~/components/button';
import { cn } from '~/utils/cn';

type WhiteButtonProps = React.JSX.IntrinsicElements['button'];

export const WhiteButton = (props: WhiteButtonProps) => {
  const { children, className, ...restOfProps } = props;

  return (
    <Button
      {...restOfProps}
      className={cn(
        'border-none bg-white text-violet-glow hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white',
        className,
      )}
    >
      {children}
    </Button>
  );
};
