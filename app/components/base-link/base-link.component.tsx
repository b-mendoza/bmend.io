import { Link } from '@tanstack/react-router';
import type { ComponentProps, ReactNode } from 'react';

type AsInternalLink = Omit<ComponentProps<typeof Link>, 'children'> &
  Readonly<{ isExternal?: false; children?: ReactNode }>;

type AsExternalLink = React.JSX.IntrinsicElements['a'] &
  Readonly<{ isExternal: true }>;

export type BaseLinkProps = AsInternalLink | AsExternalLink;

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
    preload = 'intent',
    ...restOfInternalLinkProps
  } = props;

  return (
    <Link {...restOfInternalLinkProps} preload={preload}>
      <span>{children}</span>
    </Link>
  );
};
