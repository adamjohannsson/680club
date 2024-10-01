import TextInput from '../Form/TextInput';
import Button from '../Form/Button';
import { useState } from 'react';
import userPng from '../../assets/user.png';

function Login() {
  const [email, setEmail] = useState('');

  // Add email validation function
  // TODO: move this method to utils and import it here
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
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
          text="Log in 🚧"
          textSize="sm"
          textDisabled={'Send me a login link 🚧'}
          disabled={!isValidEmail(email)}
        />
      </div>
    </div>
  );
}

export default Login;
