// To speed development we put all CSS in this file
// As app grows we should move CSS to components
import './AppV2.css';

import LoginV2 from './components/Login/Loginv2';
import Loading from './components/Global/Loading';
import AppBarV2 from './components/AppBar/AppBarV2';
import NotFoundPage from './components/Global/NotFoundPage';
import PersonalInfo from './components/Profile/PersonalInfo';
import EditConnectedAccount from './components/Profile/EditConnectedAccount';
import TermsAndConditions from './components/Prerequisites/TermsAndConditions';
import UserRequiredPersonalInfo from './components/Prerequisites/UserRequiredPersonalInfo';
import SetupCheckAndCongratulations from './components/Prerequisites/SetupCheckAndCongratulations';
import LoginFinishAfterClickingEmailLinkV2 from './components/Login/LoginFinishAfterClickingEmailLinkV2';
import { auth } from './utils/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      // Change from loading PersonalInfo to loading the dashboard page
      element: <SetupCheckAndCongratulations />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/terms-and-conditions',
      element: <TermsAndConditions />,
    },
    {
      path: '/user-required-personal-info',
      element: <UserRequiredPersonalInfo />,
    },
    {
      path: '/personal-info',
      element: <PersonalInfo />,
    },
    {
      path: '/login-finish-after-clicking-email-link',
      element: <LoginFinishAfterClickingEmailLinkV2 />,
    },
    {
      path: '/profile/edit-connected-account/:id?',
      element: <EditConnectedAccount />,
    },
  ]);
};

const isNobodyLoggedIn = ({authUser, isLoading}) => {
  return (!authUser && !isLoading && window.location.pathname !== '/login-finish-after-clicking-email-link');
};

const App = () => {
  const [authUser, isLoading] = useAuthState(auth);

  // While Firebase figures out if a User is logged
  if(isLoading) {
    return <Loading />;
  }

  if(isNobodyLoggedIn({authUser, isLoading})) {
    return <LoginV2 />;
  }

  return (
    <div>
      <AppBarV2 />

      <div className="App">
        <RouterProvider router={createRouter()} />
      </div>
    </div>
  );
};

export default App;
