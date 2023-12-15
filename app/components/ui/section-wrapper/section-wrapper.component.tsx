import { cn } from '~/utils/cn';

type SectionWrapperProps = React.JSX.IntrinsicElements['section'];

export const SectionWrapper = (props: SectionWrapperProps) => {
  const { className, ...restOfProps } = props;

  return (
    <section
      className={cn(
        'rounded-[2rem] border-[0.1rem] border-solid border-section-border/10 bg-section-background-bottom px-8 py-16',
        className,
      )}
      {...restOfProps}
    />
  );
};
