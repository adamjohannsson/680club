import Back from './Back';
import Forward from './Forward';
import { icon } from '../../data/constants';
import Settings from './Settings';

const Icon = ({
  name,
  dimensions = 24,
  stroke = '#000000',
  fill = '#ffffff',
}) => {
  const icons = {
    [icon.back]: <Back dimensions={dimensions} stroke={stroke} fill={fill} />,
    [icon.forward]: (
      <Forward dimensions={dimensions} stroke={stroke} fill={fill} />
    ),
    [icon.settings]: <Settings dimensions={dimensions} stroke={stroke} fill={fill} />,
  };

  return icons[name];
};

export default Icon;
