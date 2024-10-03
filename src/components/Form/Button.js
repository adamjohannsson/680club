const Button = ({
  text,
  textSize,
  textDisabled,
  disabled,
  onClick,
  children,
}) => {
  return (
    <div
      className={`Button TextSize ${textSize} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
    >
      {disabled ? textDisabled || text : text}
      {children}
    </div>
  );
};

export default Button;
