import type { LinkProps } from 'next/link';
import Link from 'next/link';

type LinkToProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export function LinkTo(props: LinkToProps): JSX.Element {
  const { children, className, ...linkProps } = props;

  return (
    <Link {...linkProps} passHref>
      <a className={className} href="thisWillBeReplaced">
        {children}
      </a>
    </Link>
  );
}
