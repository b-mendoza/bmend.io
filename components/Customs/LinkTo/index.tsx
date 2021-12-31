import type { LinkProps } from 'next/link';
import Link from 'next/link';

type FilteredAnchorHTMLAttributesProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>;

interface LinkToProps extends LinkProps, FilteredAnchorHTMLAttributesProps {
  download?: unknown;
}

export function LinkTo(props: LinkToProps): JSX.Element {
  const {
    as,
    children,
    href,
    locale,
    prefetch,
    replace,
    scroll,
    shallow,
    ...anchorProps
  } = props;

  return (
    <Link {...{ as, href, locale, prefetch, replace, scroll, shallow }}>
      <a {...anchorProps}>{children}</a>
    </Link>
  );
}
