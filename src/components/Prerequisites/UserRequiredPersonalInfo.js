import InputV2 from "../Form/InputV2";
import ButtonV2 from "../Form/ButtonV2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { province } from "../../data/constants";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { useAuthState } from "react-firebase-hooks/auth";
import { formMetadata, formV2 } from "../Form/formV2";

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
  const [user, setUser] = useState({});
  const [metadata, setMetadata] = useState(formMetadata.userRequiredPersonalInfo);
  const [authUser, isLoading] = useAuthState(auth);

  const form = formV2.get({metadata, setMetadata});

  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Let's get some basics</div>

      <div className='flex column gap-xl padding-top-bottom-xxl'>
        <InputV2 value={user.fullName} propertyName="fullName" form={form} onChange={({target}) => setUser({...user, fullName: target.value})} />
        <InputV2 value={user.phone} propertyName="phone" form={form} onChange={({target}) => setUser({...user, phone: target.value})} />
        <InputV2 value={user.address} propertyName="address" form={form} onChange={({target}) => setUser({...user, address: target.value})} />
      </div>

      <ButtonV2 disabled={!form.isValid()} onClick={() => updateUserPersonalInfo({ userId: authUser.uid, navigate })}>Continue to payment</ButtonV2>
    </div>
  )
};

export default UserRequiredPersonalInfo;