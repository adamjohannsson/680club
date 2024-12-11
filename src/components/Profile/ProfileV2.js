import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { dataLayer } from '../../data/dataLayer';
import { useAuthState } from 'react-firebase-hooks/auth';

const isUserInputAllRequiredPersonalInfo = ({ user }) => {
  const requiredProperties = ['firstName', 'lastName', 'phone', 'province', 'postalCode', 'address1', 'city'];

  return requiredProperties.every(property => user[property]);
}

const ProfileV2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authUser, isLoading] = useAuthState(auth);

  useEffect(() => {
    dataLayer.user.onGet({ id: authUser.uid, callback: ({ document }) => {
      // If no User or User has not yet signed terms and conditions, redirect
      if(!document || !document.hasSignedTermsAndConditions) {
        navigate('/terms-and-conditions');
        return;
      }

      // If User has not input all required personal info, redirect
      if(!isUserInputAllRequiredPersonalInfo({user: document})) {
        navigate('/user-required-personal-info');
        return;
      }

      setUser(document);
    } });
  }, []);

  return (
    <div>
      <div className='text center padding-lg size-lg'>Profile</div>
    </div>
  )
};

export default ProfileV2;
