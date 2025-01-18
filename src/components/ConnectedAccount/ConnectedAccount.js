import InputV2 from "../Form/InputV2";
import ButtonV2 from "../Form/ButtonV2";
import templates from "../../data/templates";
import BackButton from "../Global/BackButton";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";
import { auth } from "../../utils/firebase.init";
import { formMetadata, formV2 } from "../Form/formV2";
import { useNavigate, useParams } from "react-router-dom";
import { getCreditCardProvider } from "../../utils/strings";

const updateConnectedAccount = async ({ userId, connectedAccount, navigate }) => {
  const creditCardCreateResponse = await dataLayer.creditCard.update({ userId, cardNumber: connectedAccount.cardNumber, token: connectedAccount.token });
  // const creditCardCreateResponse = await dataLayer.creditCard.update({ userId, creditCardId: connectedAccount.creditCardId });

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

  navigate('/profile');
};

const ConnectedAccount = () => {
  const navigate = useNavigate();
  const { connectedAccountId } = useParams();
  const [metadata, setMetadata] = useState(formMetadata.connectedAccount);
  const [connectedAccount, setConnectedAccount] = useState(templates.connectedAccount);
  const form = formV2.get({metadata, setMetadata});

  useEffect(() => {
    if (connectedAccountId) {
      dataLayer.connectedAccount.onGet({userId: auth.currentUser.uid, connectedAccountId, callback: ({doc}) => setConnectedAccount(doc)});
    }
  }, []);

  return (
    <>
      <div className="flex column gap-sm padding-xl">
        <BackButton backUrl='/profile' />

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

        <ButtonV2 disabled={!form.isValid()} onClick={() => updateConnectedAccount({userId: auth.currentUser.uid, connectedAccount, navigate})}>Save card</ButtonV2>
      </div>
    </>
  )
}

export default ConnectedAccount;