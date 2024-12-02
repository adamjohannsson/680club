import Form from '../Form/Form';
import Button from '../Form/Button';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { dataLayer } from '../../data/dataLayer';
import { useNavigate, useParams } from 'react-router-dom';
import { getCreditCardProvider } from '../../utils/strings';

const handleSubmit = async ({ data, navigate }) => {
  const creditCardCreateResponse = await dataLayer.creditCard.create({ clubUserId: auth.currentUser.uid, cardNumber: data.number });

  if (!creditCardCreateResponse.token) {
    /** @TODO Handle error */
    console.error('Error creating credit card');
    return;
  }

  const dataToPersist = {
    ...data,
    userId: auth.currentUser.uid,
    last4: creditCardCreateResponse.last4,
    token: creditCardCreateResponse.token,
    provider: getCreditCardProvider({ number: data.number }),
  };

  await dataLayer.connectedAccount.update({ connectedAccount: dataToPersist });

  navigate('/profile');
};

const sections = [
  {
    title: 'Account',
    fields: [
      { name: 'nickname', label: 'Nickname', type: 'text', required: true },
      {
        name: 'number',
        label: 'Number',
        type: 'text',
        required: true,
        minLength: 13,
        maxLength: 16,
      },
    ],
  },
];

const EditConnectedAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [connectedAccount, setConnectedAccount] = useState({});

  useEffect(() => {
    if (id) {
      dataLayer.connectedAccount.onGet({userId: auth.currentUser.uid, connectedAccountId: id, callback: ({doc}) => setConnectedAccount(doc)});
    }
  }, [id]);

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/profile');
        }}
      >
        Cancel
      </Button>
      <div className="VerticalSpacer sm" />

      <h1>{connectedAccount ? `Edit connected account ${connectedAccount.nickname}` : 'New connected account'}</h1>
      <div className="VerticalSpacer sm" />

      <Form
        sections={sections}
        data={connectedAccount}
        setData={setConnectedAccount}
        onSubmit={({ data }) => handleSubmit({ data, navigate })}
      />
    </div>
  );
};

export default EditConnectedAccount;
