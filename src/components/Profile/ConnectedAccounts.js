import Card from '../Card/Card';
import Logo from '../Global/Logo';
import Table from '../Table/Table';
import Icons from '../Global/Icons';
import Button from '../Form/Button';
import IconButton from '../Form/IconButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { creditCardProviders } from '../../utils/enums';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setEntityFromDataLayerInto } from '../../utils/dataAccessors';
import { formatCreditCardNumber, formatDate } from '../../utils/formatters';
import {
  getConnectedAccounts,
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

// Taken from https://www.regular-expressions.info/creditcard.html
const getCreditCardProvider = ({ number }) => {
  // Remove all non-digits
  const digitsOnly = number.toString().replace(/\D/g, '');

  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex =
    /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
  const amexRegex = /^3[47][0-9]{13}$/;
  const dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const jcbRegex = /^(?:2131|1800|35\d{3})\d{11}$/;

  if (visaRegex.test(digitsOnly)) {
    return creditCardProviders.visa;
  } else if (mastercardRegex.test(digitsOnly)) {
    return creditCardProviders.mastercard;
  } else if (amexRegex.test(digitsOnly)) {
    return creditCardProviders.amex;
  } else if (dinersClubRegex.test(digitsOnly)) {
    return creditCardProviders.diners;
  } else if (discoverRegex.test(digitsOnly)) {
    return creditCardProviders.discover;
  } else if (jcbRegex.test(digitsOnly)) {
    return creditCardProviders.jcb;
  }

  return creditCardProviders.unknown;
};

const getConnectedAccountsFromDataLayer = async () => {
  return await getConnectedAccounts({
    uid: auth.currentUser.uid,
    active: true,
  });
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
    setEntityFromDataLayerInto({
      getEntityMethod: getConnectedAccountsFromDataLayer,
      setEntity: setConnectedAccounts,
    });
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
                provider={getCreditCardProvider({
                  number: connectedAccount.number,
                })}
                size="xs"
              />,
              connectedAccount.nickname,
              formatCreditCardNumber({ number: connectedAccount.number }),
              formatDate({
                timestamp: connectedAccount.updatedAt,
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
                    removeConnectedAccount({
                      uid: auth.currentUser.uid,
                      connectedAccountId: connectedAccount.id,
                    });
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
            Connect a new account
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
