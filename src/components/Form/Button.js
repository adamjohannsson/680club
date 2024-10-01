function Button({ text, textSize, textDisabled, disabled }) {
  return (
    <div
      className={`Button TextSize ${textSize} ${disabled ? 'disabled' : ''}`}
    >
      {disabled ? textDisabled || text : text}
    </div>
  );
}

export default Button;
