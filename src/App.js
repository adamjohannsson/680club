// To speed development we put all CSS in this file
// As app grows we should move CSS to components
import './App.css';

import Login from './components/Login/Login';
import AppBar from './components/AppBar/AppBar';
import Loading from './components/Global/Loading';
import Profile from './components/Profile/Profile';
import NotFoundPage from './components/Global/NotFoundPage';
import PersonalInfo from './components/Profile/PersonalInfo';
import LoginFinishAfterClickingEmailLink from './components/Login/LoginFinishAfterClickingEmailLink';
import { auth } from './utils/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditConnectedAccount from './components/Profile/EditConnectedAccount';

const createRouter = ({ user }) => {
  return createBrowserRouter([
    {
      path: '/',
      // Change from loading PersonalInfo to loading the dashboard page
      element: !user ? <Login /> : <PersonalInfo />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/login-finish-after-clicking-email-link',
      element: <LoginFinishAfterClickingEmailLink />,
    },
    {
      path: '/profile',
      element: !user ? <Login /> : <Profile />,
    },
    {
      path: '/profile/edit-connected-account/:id?',
      element: !user ? <Login /> : <EditConnectedAccount />,
    },
  ]);
};

const App = () => {
  const [user, loading] = useAuthState(auth);

  // While Firebase figures out if a User is logged show Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {user && <AppBar />}

      <div className="App Box padding-xl">
        <RouterProvider router={createRouter({ user })} />
      </div>
    </div>
  );
};

export default App;
