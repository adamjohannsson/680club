import Back from './Back';
import Forward from './Forward';
import Settings from './Settings';
import PlusCircle from './PlusCircle';
import StepCircleCheck from './StepCircleCheck';
import { icon } from '../../data/constants';
import StepCircleBase from './StepCircleBase';

const Icon = ({
  name,
  dimensions = 24,
  stroke = '#000000',
  fill = '#ffffff',
  border = '#000000',
}) => {
  const icons = {
    [icon.back]: <Back dimensions={dimensions} stroke={stroke} fill={fill} />,
    [icon.forward]: (
      <Forward dimensions={dimensions} stroke={stroke} fill={fill} />
    ),
    [icon.settings]: (
      <Settings dimensions={dimensions} stroke={stroke} fill={fill} />
    ),
    [icon.plusCircle]: (
      <PlusCircle dimensions={dimensions} stroke={stroke} fill={fill} />
    ),
    [icon.stepCircleBase]: (
      <StepCircleBase dimensions={dimensions} stroke={stroke} fill={fill} border={border} />
    ),
    [icon.stepCircleCheck]: (
      <StepCircleCheck dimensions={dimensions} stroke={stroke} fill={fill} />
    ),
  };

  return icons[name];
};

export default Icon;
