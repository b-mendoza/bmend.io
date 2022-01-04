import type { LinkProps } from 'next/link';
import Link from 'next/link';

type FilteredLinkProps = Omit<LinkProps, 'passHref'>;

type LinkToProps = FilteredLinkProps & {
  children: React.ReactNode;
  className?: string;
};

export function LinkTo(props: LinkToProps): JSX.Element {
  const { children, className, ...linkProps } = props;

  return (
    <Link {...linkProps} passHref>
      <a className={className} href="thisWillBeReplacedBy`passHref`">
        {children}
      </a>
    </Link>
  );
}
