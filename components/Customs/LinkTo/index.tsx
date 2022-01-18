import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useMemo } from 'react';

type LinkToProps = Omit<LinkProps, 'passHref'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'download' | 'href'>;

export function LinkTo({
  as,
  children,
  href,
  locale,
  prefetch,
  replace,
  scroll,
  shallow,
  ...anchorProps
}: LinkToProps): JSX.Element {
  const linkProps = useMemo(() => {
    return { as, href, locale, prefetch, replace, scroll, shallow };
  }, [as, href, locale, prefetch, replace, scroll, shallow]);

  return (
    <Link {...linkProps}>
      <a {...anchorProps}>{children}</a>
    </Link>
  );
}
