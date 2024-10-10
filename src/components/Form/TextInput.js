function TextInput({
  value,
  name,
  label,
  placeholder,
  setValue,
  onChange,
  required,
  isInvalid,
  minLength = null,
  maxLength = null,
}) {
  return (
    <div className="TextInput">
      {label && (
        <span className="TextInputLabel">
          {label}
          {required && <span className="Typography highlight">&nbsp;*</span>}
        </span>
      )}

      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={isInvalid ? 'invalid' : ''}
        onChange={(event) => {
          // If maxLength set, only change value if not longer than maxLength
          if (maxLength && event.target.value.length > maxLength) {
            return;
          }

          onChange ? onChange(event) : setValue(event.target.value);
        }}
      />
    </div>
  );
}

export default TextInput;
