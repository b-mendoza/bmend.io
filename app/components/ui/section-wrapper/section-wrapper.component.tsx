import { cn } from '~/utils/cn';

type SectionWrapperProps = React.JSX.IntrinsicElements['section'];

export const SectionWrapper = (props: SectionWrapperProps) => {
  const { className } = props;

  return (
    <section
      {...props}
      className={cn(
        'rounded-[2rem] border-[0.1rem] border-solid border-section-border/10 px-8 py-16',
        className,
      )}
    />
  );
};
