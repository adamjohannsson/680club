import Card from '../Card/Card';
import Button from '../Form/Button';
import ConnectedAccounts from './ConnectedAccounts';
import SubscriptionDetails from './SubscriptionDetails';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Card className="col noBorder">
        <div className="Box padding-lg">
          <h1>Profile</h1>
          <div className="VerticalSpacer sm" />

          <Button
            onClick={() => {
              navigate('/personal-info');
            }}
          >
            Edit Personal Info
          </Button>
        </div>
      </Card>

      <div className="VerticalSpacer lg" />

      <ConnectedAccounts />
      <div className="VerticalSpacer lg" />

      <SubscriptionDetails />
      <div className="VerticalSpacer lg" />
    </div>
  );
};

export default Profile;
