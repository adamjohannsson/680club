
const ListElement = ({ shouldListBeNumbered, children }) => shouldListBeNumbered ? <ol>{children}</ol> : <ul>{children}</ul>;

const PrivacyPolicyItem = ({ title, description, list, shouldListBeNumbered }) => {

  return (
    <>
      <div className='text size-lg'>
        {title}
      </div>

      <div className='text size-md'>
        {description}
      </div>

      {list && (
        <ListElement shouldListBeNumbered={shouldListBeNumbered}>
          {list.map((item, index) => <li className='text size-sm padding-top-bottom-xs' key={index}>{item}</li>)}
        </ListElement>
      )}

      <div className='padding-sm' />
    </>
  )
}

const privacyPolicyData = [
  {
    title: 'Information we collect',
    description: 'When you use our services, we may collect the following types of personal information:',
    list: [
      'Personal Information: Name, email, phone number, and mailing address.',
      'Financial Information: Credit card details and credit score.',
      'Technical Information: Device information (e.g., IP address, browser type), usage data (e.g., how you interact with our website).',
    ],
  },
  {
    title: 'How we use your information',
    description: 'We use the information we collect for the following purposes:',
    list: [
      'To Provide Services: Create and manage your account, process payments and manage your subscription.',
      'To Improve Our Services: Analyze usage trends and user behavior to enhance user experience, provide customer support and respond to inquiries.',
      'To Communicate with You: Send promotional emails, notify you of changes to our service, updates, or special offers.',
      'To Ensure Compliance: Comply with legal obligations and protect against fraudulent activities.',
    ],
  },
  {
    title: 'How we store and secure your information',
    description: 'We prioritize the security of your personal information and have implemented robust measures to protect it. Key aspects of our data security and storage practices include:',
    list: [
      'Encryption: All data is encrypted in transit and at rest using industry-standard encryption protocols.',
      'Access Control: Access to personal information is restricted to authorized personnel on a need-to-know basis only.',
      'Regular Reviews and Testing: We regularly review our compliance and operational policies and conduct penetration testing on a routine basis and during major technology upgrades.',
      'Third-Party Compliance: We only work with trusted third-party providers who adhere to our Terms of Service and Privacy Policy, ensuring they meet stringent security and privacy standards.',
      'Continuous Monitoring: Our systems are continuously monitored for potential vulnerabilities, and we promptly address any identified risks.',
    ],
  },
  {
    title: 'How we share your information',
    description: 'We do not sell your personal information to third parties. However, we may share your data in the following instances:',
    list: [
      'Service Providers: We may share your information with trusted third-party service providers who assist us in providing our services (e.g., payment processors).',
      'Legal Compliance: We may disclose your personal information if required by law or in response to valid legal processes.',
      'Business Transfers: In the event of a merger, acquisition, or sale of our business assets, your information may be transferred to the acquiring entity.',
    ],
  },
  {
    title: 'Your data protection rights',
    description: 'Depending on your jurisdiction, you may have the following rights:',
    list: [
      'Access: You have the right to request a copy of your personal data.',
      'Rectification: You can request that we correct any inaccurate or incomplete data.',
      'Objection: You can object to the processing of your data in certain circumstances.',
      'Deletion: You can request that we delete your personal information.',
    ],
  },
  {
    title: '680 Club is committed to protecting your personal information in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA).',
    description: 'As a Canadian organization, we adhere to the following principles outlined under PIPEDA. For more information about PIPEDA and your rights, please visit the Office of the Privacy Commissioner of Canada. In the event of a data breach, we will notify affected users promptly and report the incident to the relevant authorities as required by law.',
    list: [
      'Accountability: We are responsible for the personal information under our control and have designated an individual to oversee compliance with PIPEDA.',
      'Identifying Purposes: We will clearly explain why we are collecting your personal information at the time of collection and will use it only for the identified purposes.',
      'Consent: We obtain your informed consent before collecting, using, or disclosing your personal information, except where otherwise permitted by law.',
      'Limiting Collection: We collect only the information necessary for the purposes identified.',
      'Limiting Use, Disclosure, and Retention: Your information will not be used or disclosed for purposes other than those identified, except with your consent or as required by law. We retain your information only as long as necessary to fulfill these purposes.',
      'Accuracy: We strive to ensure that your personal information is accurate, complete, and up-to-date.',
      'Safeguards: We protect your information using security measures appropriate to its sensitivity.',
      'Openness: We make information about our policies and practices relating to the management of personal information readily available to you.',
      'Individual Access: Upon request, we will provide you with access to your personal information, explain how it is used, and describe any disclosures that have been made.',
      'Challenging Compliance: You have the right to challenge our compliance with these principles by contacting us using the details provided below.',
    ],
    shouldListBeNumbered: true,
  },
  {
    title: 'Data retention',
    description: 'We retain your financial information for as long as your account is active or as necessary to comply with legal obligations. Usage data is retained for a maximum of 12 months for analytics purposes.',
  },
  {
    title: 'Cookies and tracking technologies',
    description: 'We may use cookies and similar tracking technologies to collect usage data, enhance user experience, and deliver personalized content. You can manage cookie preferences through your browser settings.',
  },
  {
    title: 'Third-party links',
    description: 'Our website may contain links to third-party websites. This Privacy Policy applies solely to 680 Club, and we are not responsible for the privacy practices or content of other websites. We encourage you to review the privacy policies of any third-party sites you visit.',
  },
  {
    title: 'Changes to this privacy policy',
    description: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any updates will be posted on this page, and the effective date will be updated accordingly.',
  },
  {
    title: 'Contact us',
    description: 'If you have any questions or concerns regarding this Privacy Policy or how we handle your data, please contact us at:',
    list: [
      'Email: support@680club.com',
      'Phone: +1 (438) 899-1198',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className='padding-xxl'>
      <div className='text title center size-xxl'>Privacy Policy</div>

      <div className='padding-top-bottom-xxl flex column gap-xs'>
        {privacyPolicyData.map((item, index) => (
          <PrivacyPolicyItem key={index} title={item.title} description={item.description} list={item.list} shouldListBeNumbered={item.shouldListBeNumbered} />
        ))}
      </div>


      {/* <ButtonV2 onClick={() => signTermsAndConditions({ userId: authUser.uid, navigate })}>Sign Terms of Service</ButtonV2> */}
    </div>
  )
}

export default PrivacyPolicy;