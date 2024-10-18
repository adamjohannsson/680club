import Button from '../Form/Button';
import { auth } from '../../utils/firebase.init';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const [userFromAuth, isLoadingUserFromAuth] = useAuthState(auth);

  return (
    <div className="AppBar">
      <div className="Typography highlight loginOrgName" onClick={() => window.location.href = '/'}>✨ 680 Club</div>

      <div>
        {userFromAuth && (
          <div className="flex gap-sm">
            <h6>{userFromAuth.email}</h6>
            <Button text="Logout" onClick={logoutUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
