import Card from "../Global/Card";
import ButtonV2 from "../Form/ButtonV2";
import CreditCardLogo from "../Global/CreditCardLogo";
import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";

const ProfileV2 = () => {
  const [user, setUser] = useState({});
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  useEffect(() => {
    dataLayer.user.onGet({id: auth.currentUser.uid, callback: ({document}) => {
      setUser(document);
    }});
    dataLayer.connectedAccount.onGetList({userId: auth.currentUser.uid, callback: ({docs}) => {
      setConnectedAccounts(docs);
    }});
  }, []);

  return (
    <>
      <div className='flex column gap-md padding-xxl'>
        <div className='text title size-xxl'>Profile</div>
        <div className='text light size-md'>{user.fullName}'s profile</div>
        <ButtonV2>Edit profile</ButtonV2>
      </div>

      <div className='flex column gap-md padding-left-right-xxl'>
        <div className='text title size-xxl'>Credit cards</div>
        <div className='text light size-md'>Watch as your credit score increases. Here’s how to check your score with RBC.</div>

        {connectedAccounts.map(connectedAccount => (
          <Card>
            <div className='flex column'>
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

        <ButtonV2>Add card</ButtonV2>
      </div>

      <div className='flex column gap-md padding-xxl'>
        <div className='text title size-xxl'>Membership</div>
        <div className='text light size-md'>You are currently a member!</div>

        <ButtonV2>Manage membership</ButtonV2>
      </div>
    </>
  );
}

export default ProfileV2;