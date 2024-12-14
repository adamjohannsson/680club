import ButtonV2 from "../Form/ButtonV2";
import templates from "../../data/templates";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.init";
import { dataLayer } from "../../data/dataLayer";
import { useAuthState } from "react-firebase-hooks/auth";

const signTermsAndConditions = async ({ userId, navigate }) => {
  await dataLayer.user.update({ user: {
    ...templates.user,
    id: userId,
    hasSignedTermsAndConditions: true,
    dateSignedTermsAndConditions: new Date(),
  } });

  navigate("/");
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [authUser, isLoading] = useAuthState(auth);

  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Terms And Conditions</div>

      <div className='padding-lg' />

      <div className='text size-lg'>
        Paragrapth header
      </div>

      <div className='text size-md'>
        By signing these terms and conditions, you agree to be bound by our <a href='https://www.google.com' target='_blank' rel='noreferrer'>Terms of Service</a> and <a href='https://www.google.com' target='_blank' rel='noreferrer'>Privacy Policy</a>.
      </div>
      <div className='padding-lg' />

      <div className='text size-lg'>
        P2
      </div>

      <div className='text size-md'>
        Another paragraph of terms and conditions
      </div>
      <div className='padding-lg' />

      <div className='text size-lg'>
        P3
      </div>

      <div className='text size-md'>
        Another paragraph of terms and conditions
      </div>

      <div className='padding-lg' />

      <ButtonV2 onClick={() => signTermsAndConditions({ userId: authUser.uid, navigate })}>Sign Terms and Conditions</ButtonV2>
    </div>
  )
};

export default TermsAndConditions;
