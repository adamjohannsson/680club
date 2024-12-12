import ButtonV2 from "../Form/ButtonV2";
import roundInfomark from '../../assets/round-infomark-orange.png';
import roundRadarDot from '../../assets/round-radar-dot-green.png';

const Dashboard = () => {
  const StepInstructions = ({stepNumber, title, description}) => {
    const backgroundColor = ['light-tertiary', 'light-primary', 'light-secondary'];

    return (
      <div className='flex gap-md'>
        <div className={`flex center circle background-${backgroundColor[(stepNumber % 3)]}`} style={{ minWidth: '48px', height: '48px'}}>
          <div className='text size-lg color-grayscale-0'>{stepNumber}</div>
        </div>

        <div>
          <div className='text size-lg'>{title}</div>
          <div className='text light size-md padding-top-bottom-sm'>{description}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='padding-lg'>
        <div className='flex column gap-sm padding-md background-grayscale-0' style={{ border: '2px solid #D5D7DA', borderRadius: '12px' }}>
          <div className=''>
            <img src={roundInfomark} alt='info' style={{ width: '36px', height: '36px' }} />
          </div>

          <div className='text bold size-md'>One thing left to do!</div>
          <div className='text light size-md'>Link your credit card. That's how we'll upgrade your credit score.</div>

          <ButtonV2 backgroundColor='background-light-tertiary'>Link card</ButtonV2>
        </div>
      </div>

      <div className='padding-lg'>
        <div className='flex align-center gap-md background-grayscale-0 padding-xxs' style={{ border: '2px solid #D5D7DA', borderRadius: '12px' }}>
          <div className='flex align-center gap-xxs padding-xxxs padding-left-right-xs' style={{ border: '2px solid #D5D7DA', borderRadius: '8px' }}>
            <div>
              <img src={roundRadarDot} alt='info' style={{ width: '24px', height: '24px' }} />
            </div>
            <div className='text size-md'>Live credit monitoring</div>
          </div>
          <div className='text size-md'>Coming soon!</div>
        </div>
      </div>

      <div className='flex column gap-lg padding-lg'>
        <div className='text title size-xxl'>Credit bump</div>
        <div className='text size-md'>Watch as your credit score increases. Here's how to check your score with RBC.</div>

        <StepInstructions stepNumber={1} title='Access RBC online.' description='Go to the RBC website and log in to your online banking account using your username and password.' />

        <StepInstructions stepNumber={2} title='Find Credit Score section.' description='Once logged in, look for your profile in the top-right corner and select "View Your Credit Score" from the dropdown menu.' />

        <StepInstructions stepNumber={3} title='More instructions' description='Final detailed instructions to get all the way to check your credit score within the RBC app.' />
      </div>

      <div className='thumb'>
        <div className='flex justify-around padding-lg background-grayscale-0' style={{ borderTop: '2px solid #A3A3A5' }}>
          <div className='text center size-sm padding-md'>(ICON)<br/>CREDIT SCORE</div>
          <div className='text center size-sm padding-md'>(ICON)<br/>SETTINGS</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;