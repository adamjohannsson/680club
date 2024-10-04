import Card from '../Card/Card';
import Button from '../Form/Button';
import LoginLeft from './LoginLeft';
import TextInput from '../Form/TextInput';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.init';
import { isValidEmail } from '../../utils/validators';
import { useAuthState } from 'react-firebase-hooks/auth';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

const validateEmailLinkAuth = async ({ email }) => {
  const isLinkValid = isSignInWithEmailLink(auth, window.location.href);
  if (!isLinkValid) {
    // TODO: handle this
    console.log({ isLinkValid });

    return;
  }

  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      // window.localStorage.removeItem('userEmailForLogin');
      // You can access the new user by importing getAdditionalUserInfo
      // You can check if the user is new or existing:
      // getAdditionalUserInfo(result)?.isNewUser
    })
    .catch((error) => {
      // TODO handle this
      console.log({ cause: 'signInWithEmailLink', error });
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
};

const LoginFinishAfterClickingEmailLink = () => {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState(
    window.localStorage.getItem('userEmailForLogin'),
  );

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Card>
      <div className="Login">
        <LoginLeft />

        <div className="LoginRight">
          <TextInput
            label="Your Email"
            placeholder="Your Email"
            value={email}
            setValue={setEmail}
          />

          <div className="VerticalSpacer sm"></div>

          <Button
            text="Log in"
            textSize="sm"
            onClick={() => validateEmailLinkAuth({ email })}
            disabled={!isValidEmail({ email })}
            textDisabled={'Log in'}
          />
        </div>
      </div>
    </Card>
  );
};

export default LoginFinishAfterClickingEmailLink;
