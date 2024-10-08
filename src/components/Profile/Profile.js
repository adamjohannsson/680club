import Card from '../Card/Card';
import Table from '../Table/Table';
import Icons from '../Global/Icons';
import Button from '../Form/Button';
import IconButton from '../Form/IconButton';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { formatDate } from '../../utils/formatters';
import { setEntityFromDataLayerInto } from '../../utils/dataAccessors';
import {
  getCreditAccounts,
  removeCreditAccount,
} from '../../data/dataLayer';

const getCreditAccountsFromDataLayer = async () => {
  return await getCreditAccounts({ uid: auth.currentUser.uid, active: true });
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
      <div className="VerticalSpacer sm" />

      <Button>Add a credit account</Button>
      <div className="VerticalSpacer sm" />

      <Card>
        <Table
          headers={['Name', 'Description', 'Last updated', 'Actions']}
          rows={creditAccounts.map((creditAccount) => {
            return [
              creditAccount.name,
              creditAccount.description,
              formatDate({
                timestamp: creditAccount.updatedAt,
                includeTime: false,
              }),
              <div className="flex gap-sm">
                <IconButton icon={Icons.edit} />
                <IconButton
                  icon={Icons.trash}
                  onClick={() => {
                    removeCreditAccount({
                      uid: auth.currentUser.uid,
                      creditAccountId: creditAccount.id,
                    });
                  }}
                />
              </div>,
            ];
          })}
        />
      </Card>
    </div>
  );
};

export default Profile;
