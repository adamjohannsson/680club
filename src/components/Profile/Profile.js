import Button from '../Form/Button';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { formatDate } from '../../utils/formatters';
import { setEntityFromDataLayerInto } from '../../utils/dataAccessors';
import { getCreditAccounts, setCreditAccount } from '../../data/dataLayer';

const getCreditAccountsFromDataLayer = async () => {
  return await getCreditAccounts({ uid: auth.currentUser.uid });
};

const Profile = () => {
  const [creditAccounts, setCreditAccounts] = useState([]);

  useEffect(() => {
    setEntityFromDataLayerInto({
      getEntityMethod: getCreditAccountsFromDataLayer,
      setEntity: setCreditAccounts,
    });
  }, []);

  return (
    <div>
      <h1>Profile</h1>

      {creditAccounts.map(creditAccount => (
        <div key={creditAccount.id}>
          <h2>{creditAccount.name}</h2>
          <p>{creditAccount.description}</p>
          <p>{formatDate({timestamp: creditAccount.createdAt})}</p>
          <p>{formatDate({timestamp: creditAccount.updatedAt})}</p>
        </div>
      ))}

      <Button onClick={() => {
        setCreditAccount({ uid: auth.currentUser.uid, creditAccount: {
          name: `Credit Account ${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 100)}`,
          description: ['This is a credit account', 'Another description for a credit account', 'A third description for a credit account', 'A fourth description for a credit account', 'A fifth description for a credit account', 'A sixth description for a credit account', 'A seventh description for a credit account', 'An eighth description for a credit account', 'A ninth description for a credit account', 'A tenth description for a credit account'][Math.floor(Math.random() * 10)],
        } });
      }}>
        Create random credit account
      </Button>
    </div>
  );
};

export default Profile;
