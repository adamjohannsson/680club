import Card from '../Card/Card';

const SubscriptionDetails = () => {
  return (
    <Card className="col noBorder">
      <div className="Box padding-lg">
        <div className="flex gap-sm">
          <img src="https://placehold.co/56x56" />
          <div className="VerticalSpacer sm" />
          <h1>You are a premium subscriber!</h1>
        </div>

        <div className="VerticalSpacer sm" />

        <h4>Next payment: June 20, 2021</h4>
      </div>
    </Card>
  );
};

export default SubscriptionDetails;
