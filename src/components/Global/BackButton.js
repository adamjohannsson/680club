import Icon from "../Icon/Icon";
import { icon } from "../../data/constants";
import { useNavigate } from "react-router-dom";

const BackButton = ({ backUrl }) => {
  const navigate = useNavigate();

  return (
    <div className='flex align-center gap-md pointer' onClick={() => navigate(backUrl)}>
      <Icon name={icon.back} />
      <div className='text size-sm'>Back</div>
    </div>
  )
}

export default BackButton;