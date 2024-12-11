const TextInputV2 = ({ value, label, placeholder, onChange }) => {
  return (
    <input
      className="padding-md rounded-sm"
      type="text"
      placeholder={placeholder ? placeholder : label}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInputV2;
