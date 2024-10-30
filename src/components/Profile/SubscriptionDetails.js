import Card from '../Card/Card';
import Button from '../Form/Button';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getCustomer } from '../../data/dataLayer';
import { buildQueryParams } from '../../utils/urls';
import { useAuthState } from 'react-firebase-hooks/auth';

const SubscriptionDetails = () => {
  const auth = getAuth();
  const [customer, setCustomer] = useState({});
  const [userFromAuth, isLoadingUserFromAuth] = useAuthState(auth);

  useEffect(() => {
    // Ask 680 Club backend for valid Customer ID matching a customer on
    // whichever integration is used for 680 Club subscriptions
    const getCustomerAsync = async () => {
      if (userFromAuth) {
        const customer = await getCustomer({ clubUserId: userFromAuth.uid, email: userFromAuth.email });

        setCustomer(customer);
      }
    };

    getCustomerAsync();
  }, []);

  return (
    <Card className="col noBorder">
      <div className="Box padding-lg">
        <a href="https://billing.stripe.com/p/login/test_6oEcOX99m72u7Go7ss" target="_blank">Manage your subscription</a>
        <div className="VerticalSpacer sm" />

        <div className='flex gap-sm'>
          <Button
            onClick={() => window.open(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session${buildQueryParams({clubUserId: customer.id, priceId: 'price_1QFMrYC2RxzhNbTqme3L2Xsw'})}`, '_blank')}
            text="Subscribe to 680 Club Yearly"
            target="_blank"
          />
          <Button
            onClick={() => window.open(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session${buildQueryParams({clubUserId: customer.id, priceId: 'price_1QFMpQC2RxzhNbTqoM4XXboy'})}`, '_blank')}
            text="Subscribe to 680 Club Monthly"
            target="_blank"
          />
        </div>
        <div className="VerticalSpacer sm" />

        <a href={`${process.env.REACT_APP_BACKEND_URL}/create-customer-portal-session${buildQueryParams({clubUserId: customer.id})}`} target="_blank">Manage your subscription through 680 Club backend</a>
        <div className="VerticalSpacer sm" />

        <div className="flex gap-sm">
          <img src="https://placehold.co/56x56" />
          <div className="VerticalSpacer sm" />

          <h1>You are a premium subscriber!</h1>
        </div>
        <div className="VerticalSpacer sm" />

        <h4>Next payment: June 20, 2021</h4>
      </div>
    </Card>
  );
};

export default SubscriptionDetails;
