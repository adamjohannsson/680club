const defaultFormatter = ({value}) => value;

const InputV2 = ({ value = '', propertyName, metadata = {}, form, onChange }) => {
  const metadataToUse = form ? form.metadata : metadata;
  const propertyMetadata = metadataToUse[propertyName] ? metadataToUse[propertyName] : {};
  const formatter = propertyMetadata.formatter ? propertyMetadata.formatter : defaultFormatter;

  const onChangeHandler = ({target}) => {
    const formattedValue = formatter({value: target.value});
    onChange({target: {value: formattedValue}});

    if(form) {
      const validator = propertyMetadata.validator ? propertyMetadata.validator({value: formattedValue}) : () => true;
      form.setMetadata({...form.metadata, [propertyName]: {...propertyMetadata, isValid: validator}});
    }
  }

  return (
    <div className='flex column gap-xs'>
      {propertyMetadata.label && <div className="text size-sm">{propertyMetadata.label}</div>}

      <input
        className={`padding-md rounded-sm ${propertyMetadata.isValid === false && 'test'}`}
        type={propertyMetadata.type}
        placeholder={propertyMetadata.placeholder ? propertyMetadata.placeholder : propertyMetadata.label}
        value={formatter({value}) || ''}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default InputV2;
