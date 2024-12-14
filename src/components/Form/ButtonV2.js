const ButtonV2 = ({ children, onClick, disabled, padding = 'md', color = 'color-grayscale-0', backgroundColor = 'background-grayscale-10', style = {} }) => {
  const conditionalClasses = {
    cursor: disabled ? '' : 'pointer',
    background: disabled ? 'background-grayscale-5' : backgroundColor,
  }


  return (
    <div
      className={`text size-md center padding-${padding} rounded-sm ${color} ${conditionalClasses.background} ${conditionalClasses.cursor}`}
      style={style}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

export default ButtonV2;
