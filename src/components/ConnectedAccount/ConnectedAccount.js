import Icon from "../Icon/Icon";
import InputV2 from "../Form/InputV2";
import ButtonV2 from "../Form/ButtonV2";
import templates from "../../data/templates";
import { useState } from "react";
import { icon } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import { formMetadata, formV2 } from "../Form/formV2";
import { auth } from "../../utils/firebase.init";
import { getCreditCardProvider } from "../../utils/strings";

const updateConnectedAccount = async ({ connectedAccount, userId, navigate }) => {
  const creditCardCreateResponse = await dataLayer.creditCard.create({ clubUserId: userId, cardNumber: connectedAccount.cardNumber });

  if (!creditCardCreateResponse.token) {
    /** @TODO Handle error */
    console.error('Error creating credit card');
    return;
  }

  const dataToPersist = {
    ...connectedAccount,
    userId,
    last4: creditCardCreateResponse.last4,
    token: creditCardCreateResponse.token,
    provider: getCreditCardProvider({ number: connectedAccount.cardNumber }),
  };

  await dataLayer.connectedAccount.update({ connectedAccount: dataToPersist });

  navigate('/dashboard');
};

const ConnectedAccount = () => {
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState(formMetadata.connectedAccount);
  const [connectedAccount, setConnectedAccount] = useState(templates.connectedAccount);
  const form = formV2.get({metadata, setMetadata});

  return (
    <>
      <div className="flex column gap-sm padding-xl">
        <div className="flex align-center gap-md">
          <Icon name={icon.back} />
          <div className="text size-sm">Back</div>
        </div>

        <div className="text title size-xxl">Connect your card</div>
        <div className="text light size-md">We will make periodic payments to your card, which is what will increase your credit score.</div>
      </div>

      <div className="flex column gap-lg padding-top-bottom-sm padding-left-right-xl">
        <InputV2 propertyName="cardNickname" value={connectedAccount.cardNickname} metadata={metadata} form={form} onChange={({target}) => setConnectedAccount({...connectedAccount, cardNickname: target.value})} />

        <InputV2 propertyName="fullNameOnCard" value={connectedAccount.fullNameOnCard} metadata={metadata} form={form} onChange={({target}) => setConnectedAccount({...connectedAccount, fullNameOnCard: target.value})} />

        <div className='flex column gap-sm'>
          <InputV2 propertyName="cardNumber" value={connectedAccount.cardNumber} metadata={metadata} form={form} onChange={({target}) => setConnectedAccount({...connectedAccount, cardNumber: target.value})} />
          <div className='text light size-sm'>You can use your BorderPass provided RBC card, if you don't have one!</div>
        </div>

        <ButtonV2 disabled={!form.isValid()} onClick={() => updateConnectedAccount({connectedAccount, userId: auth.currentUser.uid, navigate})}>Save card</ButtonV2>
      </div>
    </>
  )
}

export default ConnectedAccount;