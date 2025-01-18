import Icon from "../Icon/Icon";
import Card from "../Global/Card";
import ButtonV2 from "../Form/ButtonV2";
import BackButton from "../Global/BackButton";
import responsive from "../../utils/responsive";
import CreditCardLogo from "../Global/CreditCardLogo";
import { icon } from "../../data/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { buildQueryParams } from "../../utils/urls";

const deleteConnectedAccount = ({userId, connectedAccountId, setConnectedAccounts}) => {
    dataLayer.connectedAccount.remove({userId, connectedAccountId});
    dataLayer.connectedAccount.onGetList({userId, active: true, callback: ({ docs }) => setConnectedAccounts(docs)});
}

const beginSubscriptionFlowInNewTab = ({customer}) => {
  const customerCreatePricingTableUrl = `${process.env.REACT_APP_BACKEND_URL}/customer-create-pricing-table${buildQueryParams({clubUserId: customer.id})}`;

  window.open(customerCreatePricingTableUrl, '_blank');
}

const AddCardButton = ({shouldRender, navigate, connectedAccounts}) => {
  const isAllowedToAddCard = connectedAccounts.length < 5;

  if(!isAllowedToAddCard || !shouldRender) {
    return null;
  }

  const isWeb = responsive.isWeb();
  return !isWeb ? (
    <ButtonV2 onClick={() => {navigate('/connected-account')}}>Add card</ButtonV2>
  ) : (
    <ButtonV2 padding='a padding-top-bottom-sm padding-left-right-md' onClick={() => {navigate('/connected-account')}}>
      <div className='flex center gap-sm'>
        <Icon name={icon.plusCircle} dimensions={24} stroke='#ffffff' fill='#000000' />

        <div>Add card</div>
      </div>
    </ButtonV2>
  )
}

const ProfileV2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [customer, setCustomer] = useState({});
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  useEffect(() => {
    dataLayer.user.onGet({id: auth.currentUser.uid, callback: ({document}) => setUser(document)});
    dataLayer.customer.onGet({clubUserId: auth.currentUser.uid, email: auth.currentUser.email, callback: ({customer}) => setCustomer(customer)});
    dataLayer.connectedAccount.onGetList({userId: auth.currentUser.uid, callback: ({docs}) => setConnectedAccounts(docs)});
  }, []);

  return (
    <>
      <div className='flex column gap-md padding-xxl'>
        <BackButton backUrl='/dashboard' />

        <div className='text title size-xxl'>Profile</div>

        <div className='text light size-md'>{user.fullName}'s profile</div>

        <div className={responsive.isWeb() ? 'flex justify-end' : ''}>
          <ButtonV2 onClick={() => navigate('/user-all-personal-info')}>Edit profile</ButtonV2>
        </div>
      </div>

      <div className='flex column gap-md padding-left-right-xxl'>
        <div className='flex justify-between align-center'>
          <div className='text title size-xxl'>Credit cards</div>
          <AddCardButton shouldRender={responsive.isWeb()} connectedAccounts={connectedAccounts} navigate={navigate} />
        </div>

        <div className='text light size-md'>Watch as your credit score increases. Here’s how to check your score with RBC.</div>

        <div className={`flex gap-md ${responsive.isWeb() ? 'wrap' : 'column'}`}>
          {connectedAccounts.map(connectedAccount => (
            <Card key={connectedAccount.id}>
              <div style={{ width: responsive.isWeb() ? '300px' : '' }}>
                <div className='flex gap-md padding-lg'>
                  <div><CreditCardLogo provider={connectedAccount.provider} /></div>
                  <div className='flex column gap-sm'>
                    <div className='text bold size-md'>{connectedAccount.cardNickname}</div>
                    <div className='text size-md color-grayscale-6'>**** **** **** {connectedAccount.last4}</div>
                  </div>
                </div>

                <div className='text size-md padding-left-right-lg'>Last updated: {new Date(connectedAccount.updatedAt.seconds * 1000).toISOString().split('T')[0]}</div>

                <div className='padding-md'></div>

                <div className='flex justify-between align-center padding-top-bottom-sm padding-left-right-lg background-grayscale-0' style={{ borderTop: '1px solid #D5D7DA' }}>
                  <div className='text size-md pointer' onClick={() => deleteConnectedAccount({userId: auth.currentUser.uid, connectedAccountId: connectedAccount.id, setConnectedAccounts})}>Delete</div>
                  <ButtonV2 color='color-grayscale-10' backgroundColor='background-grayscale-0' style={{ border: '1px solid #D5D7DA', borderRadius: '12px', padding: '12px' }} onClick={() => navigate(`/connected-account/${connectedAccount.id}`)}>Edit</ButtonV2>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <AddCardButton shouldRender={!responsive.isWeb()} connectedAccounts={connectedAccounts} navigate={navigate} />
      </div>

      <div className='flex column gap-md padding-xxl'>
        <div className='text title size-xxl'>Membership</div>
        <div className='text light size-md'>{(customer && customer.subscriptions && customer.subscriptions.length > 0) ? 'You are currently a member!' : 'Please subscribe to a plan to see your credit score improve on your credit cards.'}</div>

        <ButtonV2 onClick={() => beginSubscriptionFlowInNewTab({customer})}>Manage membership</ButtonV2>
      </div>
    </>
  );
}

export default ProfileV2;