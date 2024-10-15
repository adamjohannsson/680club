import Button from '../Form/Button';
import { getAuth, signOut } from 'firebase/auth';

const logoutUser = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // TODO: handle this
      console.log({ error });
    });
};

const AppBar = () => {
  return (
    <div className="AppBar">
      <div className="Typography highlight loginOrgName" onClick={() => window.location.href = '/'}>✨ 680 Club</div>

      <div>
        <Button text="Logout" onClick={logoutUser} />
      </div>
    </div>
  );
};

export default AppBar;
