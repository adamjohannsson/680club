import Icon from "../Icon/Icon";
import Card from "../Global/Card";
import ButtonV2 from "../Form/ButtonV2";
import responsive from "../../utils/responsive";
import CreditCardLogo from "../Global/CreditCardLogo";
import { icon } from "../../data/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { buildQueryParams } from "../../utils/urls";

const beginSubscriptionFlowInNewTab = ({customer}) => {
  const customerCreatePricingTableUrl = `${process.env.REACT_APP_BACKEND_URL}/customer-create-pricing-table${buildQueryParams({clubUserId: customer.id})}`;

  window.open(customerCreatePricingTableUrl, '_blank');
}

const AddCardMobileButton = ({navigate}) => {
  return (
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
    dataLayer.customer.onGet({clubUserId: auth.currentUser.uid, callback: ({customer}) => setCustomer(customer)});
    dataLayer.connectedAccount.onGetList({userId: auth.currentUser.uid, callback: ({docs}) => setConnectedAccounts(docs)});
  }, []);

  return (
    <>
      <div className='flex column gap-md padding-xxl'>
        <div className='text title size-xxl'>Profile</div>

        <div className='text light size-md'>{user.fullName}'s profile</div>

        <div className={responsive.isWeb() ? 'flex justify-end' : ''}>
          <ButtonV2>Edit profile</ButtonV2>
        </div>
      </div>

      <div className='flex column gap-md padding-left-right-xxl'>
        <div className='flex justify-between align-center'>
          <div className='text title size-xxl'>Credit cards</div>
          {responsive.isWeb() && <AddCardMobileButton navigate={navigate} />}
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
                  <div className='text size-md'>Delete</div>
                  <ButtonV2 color='color-grayscale-10' backgroundColor='background-grayscale-0' style={{ border: '1px solid #D5D7DA', borderRadius: '12px', padding: '12px' }}>Edit</ButtonV2>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!responsive.isWeb() && <ButtonV2 onClick={() => {navigate('/connected-account')}}>Add card</ButtonV2>}
      </div>

      <div className='flex column gap-md padding-xxl'>
        <div className='text title size-xxl'>Membership</div>
        <div className='text light size-md'>You are currently a member!</div>

        <ButtonV2 onClick={() => beginSubscriptionFlowInNewTab({customer})}>Manage membership</ButtonV2>
      </div>
    </>
  );
}

export default ProfileV2;