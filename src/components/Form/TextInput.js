function TextInput({
  value,
  name,
  label,
  placeholder,
  setValue,
  onChange,
  required,
  isInvalid,
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
        onChange={onChange ? onChange : ({ target }) => setValue(target.value)}
      />
    </div>
  );
}

export default TextInput;
