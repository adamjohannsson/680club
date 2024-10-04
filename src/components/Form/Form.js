import Card from '../Card/Card';
import Button from './Button';

const Form = ({ title, sections, onChange, onSubmit }) => {
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
          {sections.map((section, index) => (
            <div key={index} className="FormSection">
              <h2>{section.title}</h2>
              <div className="VerticalSpacer sm"></div>

              <div
                className={`grid gap-lg ${section.columns ? `cols-${section.columns}` : 'cols-2'}`}
              >
                {section.fields.map((field, index) => (
                  <div key={index}>
                    <div>
                      <label>{field.label}</label>
                      {field.required && (
                        <span className="Typography highlight">&nbsp;*</span>
                      )}
                    </div>
                    <input
                      name={field.name}
                      type={field.type}
                      value={field.value || ''}
                      onChange={onChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {onSubmit && (
          <div>
            <div className="VerticalSpacer md"></div>
            <Button text="Submit" onClick={onSubmit} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Form;
