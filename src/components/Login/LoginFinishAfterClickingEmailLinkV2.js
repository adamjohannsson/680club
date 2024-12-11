import Icon from '../Icon/Icon';
import ButtonV2 from '../Form/ButtonV2';
import { useState } from 'react';
import { icon } from '../../data/constants';
import { Navigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { isValidEmail } from '../../utils/validators';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getLocalStorageItem } from '../../utils/localStorage';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import InputV2 from '../Form/InputV2';

const validateEmailLinkAuth = async ({ email }) => {
  const isLinkValid = isSignInWithEmailLink(auth, window.location.href);
  if (!isLinkValid) {
    /** @TODO handle this */
    console.log({ isLinkValid });
    return;
  }

  // Client SDK parses code from link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then(result => {})
    .catch(error => {
      /** @TODO handle this */
      console.log({ cause: 'signInWithEmailLink', error });
    });
};

const LoginFinishAfterClickingEmailLinkV2 = () => {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState(
    getLocalStorageItem({ key: 'userEmailForLogin', defaultValue: '' }),
  );

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex column gap-xl padding-top-bottom-xl padding-left-right-xxl">
      <div className="flex align-center gap-md">
        <Icon name={icon.back} />
        <div className="text size-sm">Back</div>
      </div>

      <div className="text title size-xxl">Please confirm your email</div>

      <div className="padding-xxs"></div>

      <div className="flex column gap-md">
        <InputV2 value={email} propertyName="email" metadata={{email: {type: 'email', placeholder: 'Enter your email'}}} onChange={({target}) => setEmail(target.value)} />

        <ButtonV2
          onClick={() => validateEmailLinkAuth({ email })}
          disabled={!isValidEmail({ email })}
        >
          Log in
        </ButtonV2>
      </div>
    </div>
  )
};

export default LoginFinishAfterClickingEmailLinkV2;
