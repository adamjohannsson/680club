import ButtonV2 from "../Form/ButtonV2";
import tempIconSettings from '../../assets/temp-icon-settings.png';
import roundInfomark from '../../assets/round-infomark-orange.png';
import roundRadarDot from '../../assets/round-radar-dot-green.png';
import tempIconCheckScore from '../../assets/temp-icon-check-score.png';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import responsive from "../../utils/responsive";
import Icon from "../Icon/Icon";
import { icon } from "../../data/constants";

const ThumbMenu = ({ navigate }) => {
  return (
    <div className='thumb'>
      <div className='flex justify-around padding-lg background-grayscale-0' style={{ borderTop: '2px solid #A3A3A5' }}>
        <div className='flex column center gap-md'>
          <img src={tempIconCheckScore} style={{ width: '24px', height: '24px' }} />
          <div className='text center size-sm color-light-primary'>Credit score</div>
        </div>

        <div className='flex column center gap-md' onClick={() => {navigate('/profile')}}>
          <img src={tempIconSettings} style={{ width: '24px', height: '24px' }} />
          <div className='text center size-sm color-light-primary'>Settings</div>
        </div>
      </div>
    </div>
  );
}

const AccountSettingsButton = ({ navigate }) => {
  return (
    <div className='flex align-center gap-md rounded-xs background-grayscale-10 padding-top-bottom-xs padding-left-right-md pointer' onClick={() => {navigate('/profile')}}>
      <Icon name={icon.settings} stroke='#ffffff' fill='#000000' />
      <div className='text size-md color-grayscale-0'>Account settings</div>
    </div>
  )
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  useEffect(() => {
    dataLayer.connectedAccount.onGetList({ userId: auth.currentUser.uid, active: true, callback: ({docs}) => {
      setConnectedAccounts(docs);
    }});
  }, []);

  const StepInstructions = ({stepNumber, title, description}) => {
    const backgroundColor = ['light-quaternary', 'light-primary', 'light-secondary', 'light-tertiary'];

    return (
      <div className='flex gap-md'>
        <div className={`flex center circle background-${backgroundColor[(stepNumber % backgroundColor.length)]}`} style={{ minWidth: '48px', height: '48px'}}>
          <div className='text size-lg color-grayscale-0'>{stepNumber}</div>
        </div>

        <div>
          <div className='text bold size-lg'>{title}</div>
          <div className='text light size-md padding-top-bottom-sm'>{description}</div>
        </div>
      </div>
    )
  }

  const OneThingLeftToDo = () => {
    return (
      <div className='padding-lg'>
        <div className='flex column gap-md padding-md background-grayscale-0' style={{ border: '2px solid #D5D7DA', borderRadius: '12px' }}>
          <div className=''>
            <img src={roundInfomark} alt='info' style={{ width: '36px', height: '36px' }} />
          </div>

          <div className='text bold size-md'>One thing left to do!</div>
          <div className='text light size-md'>Link your credit card. That's how we'll upgrade your credit score.</div>

          <ButtonV2 backgroundColor='background-light-tertiary' onClick={() => {navigate('/connected-account')}}>Link card</ButtonV2>
        </div>
      </div>
    )
  }

  return (
    <>
      {connectedAccounts.length === 0 && (
        <OneThingLeftToDo />
      )}

      <div className='padding-xl'></div>

      <div className='padding-left-right-lg'>
        <div className='flex align-center gap-sm background-grayscale-0 padding-xxs' style={{ border: '2px solid #D5D7DA', borderRadius: '12px' }}>
          <div className='flex align-center gap-xxs padding-xxxs padding-left-right-xs' style={{ border: '2px solid #D5D7DA', borderRadius: '8px' }}>
            <div>
              <img src={roundRadarDot} alt='info' style={{ width: '24px', height: '24px' }} />
            </div>
            <div className='text bold size-xs'>Live credit monitoring</div>
          </div>
          <div className='text bold size-xs'>Coming soon!</div>
        </div>
      </div>

      <div className='flex column padding-top-bottom-xl padding-left-right-lg'>
        <div className='flex align-center justify-between'>
          <div className='text title size-xxl'>Credit bump</div>

          {responsive.isWeb() && <AccountSettingsButton navigate={navigate} />}
        </div>
        <div className='text size-md padding-top-md'>Watch as your credit score increases. Here's how to check your score with RBC.</div>

        <div className='padding-top-bottom-md'></div>

        <div className='flex column gap-lg padding-top-sm'>
          <StepInstructions stepNumber={1} title='Access RBC online.' description='Go to the RBC website and log in to your online banking account using your username and password.' />

          <StepInstructions stepNumber={2} title='Find Credit Score section.' description='Once logged in, look for your profile in the top-right corner and select "View Your Credit Score" from the dropdown menu.' />

          <StepInstructions stepNumber={3} title='Review your score.' description='The credit score page will show your current score along with other relevant information, updated monthly.' />

          <StepInstructions stepNumber={4} title='Plan for what’s next.' description='Watch as your credit score increases over a period of just a few months. What can a higher score do for you? Buy a house?.' />

          <div className='padding-top-bottom-xxl'></div>
        </div>
      </div>

      {!responsive.isWeb() && <ThumbMenu navigate={navigate} />}
    </>
  );
}

export default Dashboard;