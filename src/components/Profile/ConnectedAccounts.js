import Card from '../Card/Card';
import Logo from '../Global/Logo';
import Table from '../Table/Table';
import Icons from '../Global/Icons';
import Button from '../Form/Button';
import IconButton from '../Form/IconButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { formatDate } from '../../utils/formatters';
import { creditCardProviders } from '../../utils/enums';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  dataLayer,
  getUser,
  removeConnectedAccount,
} from '../../data/dataLayer';

const validateUserHasInputAllRequiredPersonalInfo = async ({
  user,
  setIsUserHasAllRequiredPersonalInfo,
}) => {
  const userFromDataLayer = await getUser({ uid: user.uid });
  const requiredPersonalInfo = [
    'firstName',
    'lastName',
    'phone',
    'address1',
    'city',
    'province',
    'postalCode',
  ];

  // Invalidate User if any required property not present or empty
  const isUserHasAllRequiredPersonalInfo = !requiredPersonalInfo.some(
    (requiredPropertyName) => {
      const propertyValue = userFromDataLayer[requiredPropertyName];
      return (
        propertyValue === '' ||
        propertyValue === null ||
        propertyValue === undefined
      );
    },
  );

  setIsUserHasAllRequiredPersonalInfo(isUserHasAllRequiredPersonalInfo);
};

const ConnectedAccounts = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [
    isUserHasAllRequiredPersonalInfo,
    setIsUserHasAllRequiredPersonalInfo,
  ] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    dataLayer.connectedAccount.onGetList({ userId, active: true, callback: ({ docs }) => setConnectedAccounts(docs)});
  }, []);

  useEffect(() => {
    validateUserHasInputAllRequiredPersonalInfo({
      user,
      setIsUserHasAllRequiredPersonalInfo,
    });
  }, [user]);

  return (
    <div>
      <Card className="col noBorder">
        <div className="VerticalSpacer sm" />

        <h1>Active accounts</h1>
        <div className="VerticalSpacer sm" />

        <Table
          showSearch={false}
          headers={[
            <>&nbsp;</>,
            'Nickname',
            'Number',
            'Last updated',
            'Actions',
          ]}
          rows={connectedAccounts.map((connectedAccount) => {
            return [
              <Logo
                provider={connectedAccount.provider || creditCardProviders.unknown}
                size="xs"
              />,
              connectedAccount.nickname,
              `**** **** **** ${connectedAccount.last4}`,
              formatDate({
                date: connectedAccount.updatedAt.toDate(),
                includeTime: false,
              }),
              <div className="flex gap-sm">
                <IconButton
                  icon={Icons.edit}
                  onClick={() => {
                    navigate(
                      `/profile/edit-connected-account/${connectedAccount.id}`,
                    );
                  }}
                />
                <IconButton
                  icon={Icons.trash}
                  onClick={() => {
                    const userId = auth.currentUser.uid;
                    removeConnectedAccount({
                      uid: userId,
                      connectedAccountId: connectedAccount.id,
                    });
                    dataLayer.connectedAccount.onGetList({userId, active: true, callback: ({ docs }) => setConnectedAccounts(docs)});
                  }}
                />
              </div>,
            ];
          })}
        />
        <div className="VerticalSpacer sm" />

        {isUserHasAllRequiredPersonalInfo ? (
          <Button
            onClick={() => {
              navigate('/profile/edit-connected-account');
            }}
          >
            Add a credit card
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate('/personal-info');
            }}
          >
            Please fill all Personal Info to connect a new account!
          </Button>
        )}
        <div className="VerticalSpacer md" />
      </Card>
    </div>
  );
};

export default ConnectedAccounts;
