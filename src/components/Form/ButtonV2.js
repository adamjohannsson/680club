const ButtonV2 = ({ children, onClick, disabled, size = 'md', backgroundColor = 'background-grayscale-10' }) => {
  const conditionalClasses = {
    cursor: disabled ? '' : 'pointer',
    background: disabled ? 'background-grayscale-5' : backgroundColor,
  }


  return (
    <div
      className={`text size-md center padding-md rounded-sm color-grayscale-0 ${conditionalClasses.background} ${conditionalClasses.cursor}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </div>
  );
};

export default ButtonV2;
