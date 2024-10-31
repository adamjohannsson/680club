const Button = ({
  text,
  className,
  textDisabled,
  disabled,
  onClick,
  children,
}) => {
  return (
    <div
      className={`Button ${className} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? () => {} : onClick}
    >
      {disabled ? textDisabled || text : text}
      {children}
    </div>
  );
};

export default Button;
