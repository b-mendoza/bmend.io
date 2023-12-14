export type ButtonProps = React.JSX.IntrinsicElements['button'];

export const Button = (props: ButtonProps) => {
  const { type = 'button', ...restOfProps } = props;

  return <button type={type} {...restOfProps} />;
};
