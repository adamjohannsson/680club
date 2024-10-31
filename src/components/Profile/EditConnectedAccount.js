import Form from '../Form/Form';
import Button from '../Form/Button';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { useNavigate, useParams } from 'react-router-dom';
import { setEntityFromDataLayerInto } from '../../utils/dataAccessors';
import { getConnectedAccount, setConnectedAccount } from '../../data/dataLayer';

const handleSubmit = ({ data, navigate }) => {
  setConnectedAccount({ uid: auth.currentUser.uid, connectedAccount: data });
  navigate('/profile');
};

const getConnectedAccountFromDataLayer = async ({ connectedAccountId }) => {
  return await getConnectedAccount({
    uid: auth.currentUser.uid,
    connectedAccountId,
  });
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
      setEntityFromDataLayerInto({
        getEntityMethod: () =>
          getConnectedAccountFromDataLayer({ connectedAccountId: id }),
        setEntity: setConnectedAccount,
      });
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
