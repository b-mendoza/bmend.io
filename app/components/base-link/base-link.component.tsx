import { Link } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';

type AsRemixLink = LinkProps & {
  isExternal?: false;
};

type AsExternalLink = React.JSX.IntrinsicElements['a'] & {
  isExternal: true;
};

export type BaseLinkProps = AsRemixLink | AsExternalLink;

/**
 * @internal
 * This component is meant to be used as a baseline for other link components.
 */
export const BaseLink = (props: BaseLinkProps) => {
  if (props.isExternal === true) {
    const { isExternal, children, ...restOfAnchorProps } = props;

    return (
      <a {...restOfAnchorProps} rel="noopener noreferrer" target="_blank">
        <span>{children}</span>
      </a>
    );
  }

  const {
    isExternal,
    children,
    prefetch = 'intent',
    ...restOfRemixLinkProps
  } = props;

  return (
    <Link {...restOfRemixLinkProps} prefetch={prefetch}>
      <span>{children}</span>
    </Link>
  );
};
