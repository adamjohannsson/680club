import Icon from "../Icon/Icon";
import { icon } from "../../data/constants";

const StepIndicators = ({ currentStep }) => {
  return (
    <div className='padding-top-xxl flex center'>
      {currentStep === 1 ? <Icon name={icon.stepCircleBase} /> : <Icon name={icon.stepCircleCheck} />}

      <div style={{ width: '24px', height: '2px', backgroundColor: currentStep <= 1 ? '#e9eaeb' : '#000000' }}></div>
      {currentStep === 2 && <Icon name={icon.stepCircleBase} />}
      {currentStep < 2 && <Icon name={icon.stepCircleBase} border='#e9eaeb' stroke='#ffffff' fill='#e9eaeb' /> }
      {currentStep > 2 && <Icon name={icon.stepCircleCheck} /> }

      <div style={{ width: '24px', height: '2px', backgroundColor: currentStep <= 2 ? '#e9eaeb' : '#000000' }}></div>
      {currentStep === 3 && <Icon name={icon.stepCircleBase} />}
      {currentStep < 3 && <Icon name={icon.stepCircleBase} border='#e9eaeb' stroke='#ffffff' fill='#e9eaeb' /> }
      {currentStep > 3 && <Icon name={icon.stepCircleCheck} /> }
    </div>
  );
}

export default StepIndicators;