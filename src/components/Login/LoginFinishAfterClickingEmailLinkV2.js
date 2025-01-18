import InputV2 from '../Form/InputV2';
import ButtonV2 from '../Form/ButtonV2';
import BackButton from '../Global/BackButton';
import { useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { isValidEmail } from '../../utils/validators';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../../utils/localStorage';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

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
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState(
    getLocalStorageItem({ key: 'userEmailForLogin', defaultValue: '' }),
  );

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex column gap-xl padding-top-bottom-xl padding-left-right-xxl">
      <BackButton backUrl='/login' />

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
