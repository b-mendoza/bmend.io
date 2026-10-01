type ExternalLinkProps = Readonly<React.JSX.IntrinsicElements["a"]>;

export const ExternalLink = (props: ExternalLinkProps) => {
  const { children, ...restOfAnchorProps } = props;

  return (
    <a {...restOfAnchorProps} rel="noopener noreferrer" target="_blank">
      <span>{children}</span>
    </a>
  );
};
