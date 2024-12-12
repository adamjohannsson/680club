import ButtonV2 from '../Form/ButtonV2';
import roundCheckmark from '../../assets/round-checkmark-green.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { dataLayer } from '../../data/dataLayer';
import { buildQueryParams } from '../../utils/urls';
import { useAuthState } from 'react-firebase-hooks/auth';

const checkSubscription = async ({ authUser, user, navigate }) => {
  /** @TODO manage errors in connections to backend */
  const customer = await dataLayer.customer.get({ clubUserId: authUser.uid, email: authUser.email });
  const isSubscribed = customer.subscriptions && customer.subscriptions.length > 0 ? true : false;

  console.log({customer, isSubscribed});
  if(!isSubscribed) {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/customer-create-pricing-table${buildQueryParams({clubUserId: customer.id})}`, '_blank');
    return;
  }

  dataLayer.user.update({ user: {
    ...user,
    isSubscriptionActive: true,
    dateLastSubscriptionCheck: new Date(),
  } });
}

const isUserInputAllRequiredPersonalInfo = ({ user }) => {
  const requiredProperties = ['fullName', 'phone', 'address'];

  return requiredProperties.every(property => user[property]);
}

const SetupCheckAndCongratulations = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
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

      // If User has not yet completed payment, redirect
      if(!document.isSubscriptionActive) {
        checkSubscription({ authUser, user: document, setUser, navigate });
      }

      setUser(document);
    } });
  }, []);

  return (
    <div>
      <div className='flex center padding-top-bottom-xxl size-xxl'>
        <img src={roundCheckmark} alt='round checkmark' style={{ width: '192px' }}/>
      </div>
      <div className='text title center size-xxl'>Well done!</div>
      <div className='text center padding-top-bottom-lg padding-left-right-lg size-md'>Congrats on setting up. We'll keep you in the loop when your credit score increases.</div>

      <div className='thumb'>
        <div className='padding-lg'>
          <ButtonV2 onClick={() => navigate('/credit-dashboard')}>Go to Credit dashboard</ButtonV2>
        </div>
      </div>
    </div>
  )
};

export default SetupCheckAndCongratulations;
