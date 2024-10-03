import userPng from '../../assets/user.png';

function LoginLeft() {
  return (
    <div className="LoginLeft">
      <div className="Typography highlight login-org-name">✨ 680 Club</div>

      <div className="VerticalSpacer xs" />

      <img className="ImageLoginUser" src={userPng} alt="Satisfied customer" />

      <div className="VerticalSpacer xs" />

      <h3>Improve your credit score.</h3>
    </div>
  );
}

export default LoginLeft;
