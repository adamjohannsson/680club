import Button from './Button';
import Card from '../Card/Card';
import { useState } from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

const validate = ({
  formSections,
  setFormSections,
  data,
  onSubmit,
  setSubmitId,
}) => {
  let isFormValid = true;
  const submitId = Math.random() * 99999999999999;

  // Validate the sections, mark invalid sections as such
  formSections.map((section) => {
    section.isInvalid = false;

    section.fields.map((field) => {
      field.isInvalid = false;

      if (field.required && (!data[field.name] || !data[field.name] === '')) {
        isFormValid = false;
        section.isInvalid = true;
        field.isInvalid = true;
      }
    });
  });

  if (!isFormValid) {
    setFormSections(JSON.parse(JSON.stringify(formSections)));
    return;
  }

  // If the form is valid, call onSubmit function given by parent
  onSubmit();
  setSubmitId(submitId);
};

const Form = ({ title, sections, data, onChange, onSubmit }) => {
  const [submitId, setSubmitId] = useState(false);
  const [formSections, setFormSections] = useState(
    JSON.parse(JSON.stringify(sections)),
  );

  return (
    <Card>
      <div className="Form">
        {title && (
          <div>
            <h1>{title}</h1>
            <div className="VerticalSpacer sm"></div>
          </div>
        )}

        <div className="FormSections">
          {formSections.map((section, index) => (
            <div
              key={index}
              className={`FormSection ${section.isInvalid ? 'invalid' : ''}`}
            >
              <h2>{section.title}</h2>
              <div className="VerticalSpacer sm"></div>

              <div
                className={`grid gap-lg ${section.columns ? `cols-${section.columns}` : 'cols-2'}`}
              >
                {section.fields.map((field, index) => (
                  <div key={index}>
                    {field.type === 'text' ? (
                      <TextInput
                        name={field.name}
                        label={field.label}
                        value={data[field.name] || ''}
                        required={field.required}
                        isInvalid={field.isInvalid}
                        placeholder={field.placeholder}
                        onChange={onChange}
                      />
                    ) : (
                      <SelectInput
                        name={field.name}
                        label={field.label}
                        value={data[field.name] || ''}
                        options={field.options}
                        required={field.required}
                        isInvalid={field.isInvalid}
                        placeholder={field.placeholder}
                        onChange={onChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {onSubmit && (
          <div>
            <div className="VerticalSpacer md"></div>
            <Button
              text="Submit"
              onClick={() =>
                validate({
                  formSections,
                  setFormSections,
                  data,
                  onSubmit,
                  setSubmitId,
                })
              }
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Form;
