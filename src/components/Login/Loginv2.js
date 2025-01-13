import Icon from "../Icon/Icon";
import InputV2 from "../Form/InputV2";
import ButtonV2 from "../Form/ButtonV2";
import AppBarV2 from "../AppBar/AppBarV2";
import { useState } from "react";
import { icon } from "../../data/constants";
import { isValidEmail } from "../../utils/validators";
import { actionCodeSettings } from "../../utils/firebase.init";
import { getLocalStorageItem } from "../../utils/localStorage";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const handleSendEmailLink = ({ email, auth, setIsEmailLinkSent }) => {
  if (!isValidEmail({ email })) {
    return;
  }

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Inform User and save email locally to not request again if User opens link on same device.
      window.localStorage.setItem('userEmailForLogin', email);
      setIsEmailLinkSent(true);
    })
    .catch((error) => {
      /** @TODO Setup Telegram alert, log error to Firebase(?) */
      console.log({ error });
    });
};

const LoginV2 = () => {
  const auth = getAuth();
  const [email, setEmail] = useState(
    getLocalStorageItem({ key: 'userEmailForLogin', defaultValue: 'asd' }),
  );
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false);

  return (
    <>
      <AppBarV2 />

      <div className="desktop-container">
        <div className="desktop-box" style={{width: '100%'}}>

          <div className="flex column gap-xl padding-top-bottom-xl padding-left-right-xxl">
        <div className="flex align-center gap-md">
          <Icon name={icon.back} />
          <div className="text size-sm">Back</div>
        </div>

        <div className="text title size-xxl">Login</div>

        <div className="padding-xxs"></div>

        <div className="flex column gap-md">
          <InputV2 value={email} propertyName="email" metadata={{email: {type: 'email', placeholder: 'Enter your email'}}} onChange={({target}) => setEmail(target.value)} />

          <ButtonV2
            onClick={() => handleSendEmailLink({ email, auth, setIsEmailLinkSent })}
            disabled={!isValidEmail({ email })}
            >
            Continue
          </ButtonV2>
          {isEmailLinkSent && <div className="text size-sm color-grayscale-7">We sent an email to {email}. Please click the link on the email to continue the login process.</div>}
        </div>
      </div>

        </div>
      </div>

    </>
  );
};

export default LoginV2;
