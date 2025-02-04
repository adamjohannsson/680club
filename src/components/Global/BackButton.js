import Icon from "../Icon/Icon";
import { icon } from "../../data/constants";
import { useNavigate } from "react-router-dom";

const BackButton = ({ backUrl }) => {
  const navigate = useNavigate();

  return (
    <div className='flex align-center gap-xs pointer' onClick={() => navigate(backUrl)}>
      <Icon name={icon.back} dimensions='20' />
      <div className='text size-sm'>Back</div>
    </div>
  )
}

export default BackButton;