import Loading from '../Global/Loading';
import { auth } from '../../utils/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const PersonalInfo = () => {
  const [user, loading] = useAuthState(auth);

  if (!user) {
    // This page waits for the user to be authenticated
    return <Loading />;
  }

  return (
    <div>
      <h1>Personal Info 🚧</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default PersonalInfo;
