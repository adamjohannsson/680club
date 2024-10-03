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
      <Button text="Logout" onClick={logoutUser} />
    </div>
  );
};

export default AppBar;
