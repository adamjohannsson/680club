import Card from '../Card/Card';
import Button from '../Form/Button';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { dataLayer } from '../../data/dataLayer';
import { buildQueryParams } from '../../utils/urls';
import { useAuthState } from 'react-firebase-hooks/auth';

const isCustomerExists = ({customer}) => {
  return customer && customer.id ? true : false;
};

const isCustomerSubscribed = ({customer}) => {
  return customer.subscriptions && customer.subscriptions.length > 0 ? true : false;
};

const isClubUserHasAtLeastOneConnectedAccount = ({connectedAccounts}) => {
  return connectedAccounts.length > 0;
};

const SubscriptionDetails = () => {
  const auth = getAuth();
  const [customer, setCustomer] = useState({});
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [userFromAuth, isLoadingUserFromAuth] = useAuthState(auth);

  useEffect(() => {
    const userId = userFromAuth.uid;
    const email = userFromAuth.email;

    if (userFromAuth) {
      // Ask 680Club backend for valid Customer ID matching a customer on integration used for 680 Club subscriptions
      dataLayer.customer.onGet({ clubUserId: userId, email, callback: ({ customer }) => setCustomer(customer) });
      dataLayer.connectedAccount.onGetList({ userId, active: true, callback: ({ docs }) => setConnectedAccounts(docs) });
    }
  }, []);

  return (
    <Card className="col">
      <div className="Box padding-lg">
        {/*
        State 1: customer exists - is subscribed => Show manage subscription button
        State 2: customer exists - not subscribed - has credit cards => Show subscribe button
        State 3: customer exists - not subscribed - has no credit cards => Show add credit card info
        */}
        {isCustomerExists({customer}) && isCustomerSubscribed({customer}) && (
          <div>
            <h1>You are a premium subscriber!</h1>
            <div className="VerticalSpacer sm" />
            <Button
                onClick={() => window.open(`${process.env.REACT_APP_BACKEND_URL}/customer-create-portal-session${buildQueryParams({clubUserId: customer.id})}`, '_blank')}
                text="Manage your subscription"
                target="_blank"
              />
          </div>
        )}

        {isCustomerExists({customer}) && !isCustomerSubscribed({customer}) && isClubUserHasAtLeastOneConnectedAccount({connectedAccounts}) && (
          <div className="flex gap-sm">
            <Button
              onClick={() => window.open(`${process.env.REACT_APP_BACKEND_URL}/customer-create-pricing-table${buildQueryParams({clubUserId: customer.id})}`, '_blank')}
              text="Subscribe to 680 Club"
              target="_blank"
            />
          </div>
        )}

        {isCustomerExists({customer}) && !isCustomerSubscribed({customer}) && !isClubUserHasAtLeastOneConnectedAccount({connectedAccounts}) && (
          <div className="flex gap-lg">
            <Button text="Subscribe to 680 Club" disabled={true} />
            <div>
              <h1>Before subscribing</h1>
              <h2>Please add at least 1 Credit Card to your account.</h2>
              <div>So we can start working on boosting your credit score immediately after you subscribe.</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionDetails;
