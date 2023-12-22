import { BaseLink } from '~/components/base-link';
import type { BaseLinkProps } from '~/components/base-link';
import { PARAGRAPH_SIZES } from '~/components/typography/paragraph';
import { cn } from '~/utils/cn';

type WhiteLinkProps = BaseLinkProps;

export const WhiteLink = (props: WhiteLinkProps) => {
  const { children, className } = props;

  return (
    <BaseLink
      {...props}
      className={cn(
        'rounded-2xl bg-white px-[2.2rem] py-[1.4rem] font-medium text-violet-glow hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white',
        PARAGRAPH_SIZES.lg,
        className,
      )}
    >
      {children}
    </BaseLink>
  );
};
