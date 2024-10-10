import Card from '../Card/Card';
import ConnectedAccounts from './ConnectedAccounts';
import SubscriptionDetails from './SubscriptionDetails';

const Profile = () => {
  return (
    <div>
      <Card className="col noBorder">
        <div className="VerticalSpacer md" />
        <h1>Profile</h1>
        <div className="VerticalSpacer md" />
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
