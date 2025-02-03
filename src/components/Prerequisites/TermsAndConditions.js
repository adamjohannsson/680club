import ButtonV2 from "../Form/ButtonV2";
import templates from "../../data/templates";
import { Link, useNavigate } from "react-router-dom";
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

const TermsOfServiceItem = ({ title, description, list }) => {
  return (
    <>
      <div className='text size-lg'>
        {title}
      </div>

      <div className='text size-md'>
        {description}
      </div>

      {list && (
        <ul>
          {list.map((item, index) => <li className='text size-sm padding-top-bottom-xs' key={index}>{item}</li>)}
        </ul>
      )}

      <div className='padding-sm' />
    </>
  )
}

const termsOfServiceData = [
  {
    title: 'Subscription Service',
    description: '680 Club is a subscription-based service designed to help users optimize their credit score and other credit metrics to improve their overall credit standing. Individual results may vary, and users are encouraged to maintain responsible financial habits to maximize benefits.'
  },
  {
    title: 'Maintaining Good Financial Habits',
    description: 'While our service is designed to help you improve your credit score, it is essential that you continue practicing responsible financial habits, such as paying bills on time and maintaining low credit utilization, to ensure the intended benefits of the product.'
  },
  {
    title: 'No Guarantee of Credit Score Improvement',
    description: '680 Club does not guarantee any specific increase in your credit score. While many users see up to a 100-point improvement in their credit score over six months, individual results may vary.'
  },
  {
    title: 'Refund Policy',
    description: 'If you are not 100% satisfied with our service, we offer a full refund of the remaining subscription amount. Simply contact us, and we will process your refund.'
  },
  {
    title: 'Limited Liability',
    description: '680 Club is not liable for any deterioration of your credit score that may occur as a result of external factors, including but not limited to your financial decisions, third-party actions, or force majeure events. The responsibility to manage your overall financial health lies solely with you.'
  },
  {
    title: 'Data Security and Compliance',
    description: 'Your information is stored securely and is protected in compliance with all applicable laws and regulations. We take your privacy and security seriously, and use industry-standard encryption and safeguards to protect your information.'
  },
  {
    title: 'Third-Party Compliance',
    description: '680 Club only partners with third-party service providers that adhere to our Terms of Service and Privacy Policy, ensuring the protection and confidentiality of user data.'
  },
  {
    title: 'No Fraud Monitoring',
    description: '680 Club does not monitor your credit score or profile for any fraudulent activity, misuse, or errors. We recommend that you regularly review your credit reports to ensure accuracy and report any suspicious activity to the appropriate authorities.'
  },
  {
    title: 'Credit Consent',
    description: 'By using 680 Club’s services, you consent to the collection, use, and sharing of your credit-related data in accordance with our Privacy Policy. While 680 Club does not access your full credit score or detailed credit history, we may collect and process limited credit information as permitted by applicable laws to facilitate the improvement of your credit score. This may include information derived from your financial activity or transactions as outlined in our Privacy Policy. You acknowledge that:',
    list: [
      'Any credit-related information collected will be used solely for the purpose of providing and improving our services.',
      '680 Club may share such information with trusted third-party service providers to enable service delivery, in accordance with our Privacy Policy.',
      'You can revoke this consent at any time by terminating your use of our services, though some processing may be required to comply with legal obligations or resolve outstanding matters.'
    ]
  }
];

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [authUser, isLoading] = useAuthState(auth);

  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Terms of Service (TOS)</div>

      <div className='flex column gap-sm padding-top-bottom-xxl'>
        {termsOfServiceData.map((item, index) => (
          <TermsOfServiceItem key={index} title={item.title} description={item.description} list={item.list} />
        ))}

        <div className='text size-md'>For more details on how your information is handled, please refer to our <Link to='/privacy-policy'>Privacy Policy</Link>.</div>
      </div>


      <ButtonV2 onClick={() => signTermsAndConditions({ userId: authUser.uid, navigate })}>Sign Terms of Service</ButtonV2>
    </div>
  )
};

export default TermsAndConditions;
