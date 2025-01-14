import InputV2 from "../Form/InputV2";
import ButtonV2 from "../Form/ButtonV2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { formMetadata, formV2 } from "../Form/formV2";
import { useAuthState } from "react-firebase-hooks/auth";

const updateUserPersonalInfo = async ({ user, navigate }) => {
  await dataLayer.user.update({ user });

  navigate("/profile");
};

const UserAllPersonalInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [metadata, setMetadata] = useState(formMetadata.userRequiredPersonalInfo);
  const [authUser, isLoading] = useAuthState(auth);

  const form = formV2.get({metadata, setMetadata});

  useEffect(() => {
    dataLayer.user.onGet({id: authUser.uid, callback: ({ document }) => setUser(document)});
  }, [authUser.uid]);

  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Let's get some basics</div>

      <div className='flex column gap-xl padding-top-bottom-xxl'>
        <InputV2 value={user.fullName} propertyName="fullName" form={form} onChange={({target}) => setUser({...user, fullName: target.value})} />
        <InputV2 value={user.phone} propertyName="phone" form={form} onChange={({target}) => setUser({...user, phone: target.value})} />
        <InputV2 value={user.address} propertyName="address" form={form} onChange={({target}) => setUser({...user, address: target.value})} />
      </div>

      <ButtonV2 disabled={!form.isValid()} onClick={() => updateUserPersonalInfo({ user, navigate })}>Back to settings</ButtonV2>
    </div>
  )
};

export default UserAllPersonalInfo;
