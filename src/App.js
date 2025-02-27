// To speed development we put all CSS in this file
// As app grows we should move CSS to components
import './AppV2.css';

import LoginV2 from './components/Login/Loginv2';
import Loading from './components/Global/Loading';
import AppBarV2 from './components/AppBar/AppBarV2';
import ProfileV2 from './components/Profile/ProfileV2';
import Dashboard from './components/Dashboard/Dashboard';
import NotFoundPage from './components/Global/NotFoundPage';
import PrivacyPolicy from './components/Prerequisites/PrivacyPolicy';
import ConnectedAccount from './components/ConnectedAccount/ConnectedAccount';
import TermsAndConditions from './components/Prerequisites/TermsAndConditions';
import UserAllPersonalInfo from './components/Prerequisites/UserAllPersonalInfo';
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
      path: '/profile',
      element: <ProfileV2 />,
    },
    {
      path: '/connected-account/:connectedAccountId?',
      element: <ConnectedAccount />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/terms-and-conditions',
      element: <TermsAndConditions />,
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/user-required-personal-info',
      element: <UserRequiredPersonalInfo />,
    },
    {
      path: '/user-all-personal-info',
      element: <UserAllPersonalInfo />,
    },
    {
      path: '/login-finish-after-clicking-email-link',
      element: <LoginFinishAfterClickingEmailLinkV2 />,
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

      <div className="desktop-container">
        <div className="desktop-box">
          <RouterProvider router={createRouter()} />
        </div>
      </div>
    </div>
  );
};

export default App;
