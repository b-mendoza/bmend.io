import type { BaseLinkProps } from '~/components/base-link';
import { BaseLink } from '~/components/base-link';
import { cn } from '~/utils/cn';

export type LinkProps = BaseLinkProps;

export const Link = (props: LinkProps) => {
  const { className } = props;

  return (
    <BaseLink
      {...props}
      className={cn(
        'px-6 py-[0.4rem] text-white hover:rounded-[2rem] hover:bg-white/10 focus-visible:rounded-[2rem] focus-visible:bg-white/10',
        className,
      )}
    />
  );
};
