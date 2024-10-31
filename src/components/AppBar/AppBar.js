import Button from '../Form/Button';
import { auth } from '../../utils/firebase.init';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Get a different color for each letter of the alphabet
const getColorForLetter = ({ letter }) => {
  const colors = ['f0c0f0', 'c0f0f0', 'f0f0c0', 'c0a0f0', 'a0c0f0', 'a0f0c0', 'c0a0f0', 'f0a0c0', 'a0a0c0', 'c0a0a0', 'a0c0a0', 'a0a0f0', 'f0a0a0'];
  return colors[letter.charCodeAt(0) % colors.length];
};

const logoutUser = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {})
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
            <a href="#" onClick={logoutUser}>Logout</a>
            <img src={`https://placehold.co/40x40/${getColorForLetter({ letter: userFromAuth.email[0] })}/000000?text=${userFromAuth.email[0]}`} alt="680 Club" title={userFromAuth.email} style={{ cursor: 'pointer', borderRadius: '50%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
