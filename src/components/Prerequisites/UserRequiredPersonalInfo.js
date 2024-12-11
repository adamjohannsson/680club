import ButtonV2 from "../Form/ButtonV2";
import { useNavigate } from "react-router-dom";
import { province } from "../../data/constants";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { useAuthState } from "react-firebase-hooks/auth";

const updateUserPersonalInfo = async ({ userId, navigate }) => {
  await dataLayer.user.update({ user: {
    firstName: 'Omar',
    lastName: 'Reda',
    id: userId,
    city: 'Toronto',
    phone: '123-456-7890',
    address1: '123 My St',
    province: province.ON,
    postalCode: 'M5V 3L9',
  } });

  navigate("/");
};

const UserRequiredPersonalInfo = () => {
  const navigate = useNavigate();
  const [authUser, isLoading] = useAuthState(auth);

  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Let's get some basics</div>

      <div className='padding-lg' />

      <ButtonV2 onClick={() => updateUserPersonalInfo({ userId: authUser.uid, navigate })}>Continue to payment</ButtonV2>
    </div>
  )
};

export default UserRequiredPersonalInfo;