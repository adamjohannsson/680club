import TextInput from '../Form/TextInput';
import Button from '../Form/Button';
import Card from '../Card/Card';
import { useState } from 'react';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { actionCodeSettings } from '../../utils/firebase.init';
import { isValidEmail } from '../../utils/validators';
import userPng from '../../assets/user.png';

function Login() {
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleLogin = () => {
    if (!isValidEmail({ email })) {
      return;
    }

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      // Link successfully sent. Inform User.
      // Save email locally to not request again if User opens link on same device.
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <Card>
      <div className="Login">
        <div className="LoginLeft">
          <div className="Typography highlight login-org-name">✨ 680 Club</div>

          <div className="VerticalSpacer xs" />

          <img
            className="ImageLoginUser"
            src={userPng}
            alt="Satisfied customer"
          />

          <div className="VerticalSpacer xs" />

          <h3>Improve your credit score.</h3>
        </div>

        <div className="LoginRight">
          <h2>Login or register</h2>

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
            onClick={handleLogin}
            disabled={!isValidEmail({ email })}
            textDisabled={'Send me a login link 🚧'}
          />
        </div>
      </div>
    </Card>
  );
}

export default Login;
