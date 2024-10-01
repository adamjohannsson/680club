function Button({ text, textSize, textDisabled, disabled, onClick }) {
    return (
        <div className={`Button TextSize ${textSize} ${disabled ? "disabled" : ""}`} onClick={onClick}>{disabled ? textDisabled || text : text}</div>
    );
}

export default Button;