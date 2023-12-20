import { Link } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';
import { cn } from '~/utils/cn';

const BASE_CLASS_NAMES =
  'px-6 py-[0.4rem] text-white hover:rounded-[2rem] hover:bg-white/10';

type AsRemixLink = LinkProps & {
  isExternal?: false;
};

type AsExternalLink = React.JSX.IntrinsicElements['a'] & {
  isExternal: true;
};

type CustomLinkProps = AsRemixLink | AsExternalLink;

export const CustomLink = (props: CustomLinkProps) => {
  const { children, className, isExternal } = props;

  if (isExternal === true) {
    const { isExternal: _isExternal, ...restOfAnchorProps } = props;

    return (
      <a
        {...restOfAnchorProps}
        className={cn(BASE_CLASS_NAMES, className)}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  const {
    isExternal: _isExternal,
    prefetch = 'intent',
    ...restOfRemixLinkProps
  } = props;

  return (
    <Link
      {...restOfRemixLinkProps}
      className={cn(BASE_CLASS_NAMES, className)}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

export { CustomLink as Link };
