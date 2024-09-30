function TextInput({ value, label, placeholder, setValue }) {
  return (
    <div className="TextInput">
        {value && <span className="TextInputLabel">{label}</span>}
        <input type="text" placeholder={placeholder} value={value} onChange={({target}) => setValue(target.value)} />
    </div>
  );
}

export default TextInput;