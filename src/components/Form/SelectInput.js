import { useEffect, useRef, useState } from 'react';
import { getNormalizedText } from '../../utils/strings';

// Allow User to filter to reduce the options list
const progressiveSearch = ({ options, filterValue }) => {
  return options.filter((option) =>
    getNormalizedText(option.label).includes(getNormalizedText(filterValue)),
  );
};

// Open above when element rendered above or below 50% viewport height
const shouldOpenAbove = ({ element }) => {
  const viewportHeight = window.innerHeight;
  const elementTop = window.scrollY + element.getBoundingClientRect().top;
  return elementTop > viewportHeight / 2;
};

const getOptionLabel = ({ options, value }) => {
  if (!value || !options.find((option) => option.value === value)) return '';

  return options.find((option) => option.value === value).label;
};

const SelectInput = ({
  value,
  name,
  label,
  placeholder,
  options,
  onChange,
  required,
  isInvalid,
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [isOpenAbove, setIsOpenAbove] = useState(false);

  useEffect(() => {
    setIsOpenAbove(shouldOpenAbove({ element: ref.current }));
  }, [ref, isOpenAbove]);

  return (
    <div className="SelectInput" ref={ref}>
      {label && (
        <span className="SelectInputLabel">
          {label}
          {required && <span className="Typography highlight">&nbsp;*</span>}
        </span>
      )}

      <input
        value={getOptionLabel({ options, value })}
        placeholder={placeholder}
        readOnly
        className={`SelectInputValue ${isInvalid ? 'invalid' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`SelectInputOptions ${isOpen ? 'open' : ''} ${isOpenAbove ? 'openAbove' : ''}`}
      >
        <h3>{label}</h3>
        <input
          value={filterValue}
          placeholder="Search..."
          onChange={({ target }) => setFilterValue(target.value)}
        />

        <div className="SelectInputOptionsList">
          <div
            name={name}
            value=""
            className="SelectInputOption blank"
            onClick={(event) => {
              onChange(event);
              setIsOpen(false);
            }}
          >
            Blank
          </div>
          {progressiveSearch({ options, filterValue }).map((option, index) => (
            <div
              name={name}
              value={option.value}
              className="SelectInputOption"
              onClick={(event) => {
                onChange(event);
                setIsOpen(false);
              }}
              key={index}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
