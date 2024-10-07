import Card from '../Card/Card';
import Button from '../Form/Button';
import LoginLeft from './LoginLeft';
import TextInput from '../Form/TextInput';
import { useState } from 'react';
import { isValidEmail } from '../../utils/validators';
import { actionCodeSettings } from '../../utils/firebase.init';
import { getLocalStorageItem } from '../../utils/localStorage';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import roundCheckmark from '../../assets/round-checkmark.png';

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState(
    getLocalStorageItem({ key: 'userEmailForLogin', defaultValue: '' }),
  );
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false);

  const handleSendEmailLink = () => {
    if (!isValidEmail({ email })) {
      return;
    }

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      // Link successfully sent. Inform User.
      // Save email locally to not request again if User opens link on same device.
      .then(() => {
        window.localStorage.setItem('userEmailForLogin', email);
        setIsEmailLinkSent(true);
      })
      .catch((error) => {
        console.log({ error });
        // TODO:
        // Setup Telegram alert
        // Log error to Firebase(?)
      });
  };

  return (
    <div className="Login">
      <LoginLeft />

      <div className="LoginRight">
        {!isEmailLinkSent && (
          <div>
            <h2>Login or register</h2>
            <div className="VerticalSpacer sm" />

            <TextInput
              label="Your Email"
              placeholder="Your Email"
              value={email}
              setValue={setEmail}
            />

            <div className="VerticalSpacer sm"></div>

            <Button
              text="Send me a login link"
              className="text-sm fullWidth"
              onClick={handleSendEmailLink}
              disabled={!isValidEmail({ email })}
              textDisabled={'Send me a login link'}
            />
          </div>
        )}

        {isEmailLinkSent && (
          <div className="flex col gap-sm">
            <img
              className="ImageLoginRoundCheckmark"
              src={roundCheckmark}
              alt="A round green checkmark"
            />
            <div className="VerticalSpacer xs" />

            <h2>The link is sent</h2>

            <h2>Check the inbox</h2>
            <div className="VerticalSpacer xs" />

            <div className="flex gap-sm">
              <h6>{email}</h6>

              <h6>
                <a onClick={() => setIsEmailLinkSent(false)}>Send again</a>
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
