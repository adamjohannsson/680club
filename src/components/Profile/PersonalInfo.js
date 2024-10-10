import Form from '../Form/Form';
import Loading from '../Global/Loading';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUser, setUser } from '../../data/dataLayer';

const sections = [
  {
    title: 'Contact',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John',
      },
      {
        name: 'lastName',
        label: 'Last Name(s)',
        type: 'text',
        required: true,
        placeholder: 'Doe',
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        required: true,
        placeholder: '123-456-7890',
      },
    ],
  },
  {
    title: 'Address',
    fields: [
      {
        name: 'address1',
        label: 'Address line 1',
        type: 'text',
        required: true,
        placeholder: '1234 Main St',
      },
      {
        name: 'address2',
        label: 'Address line 2',
        type: 'text',
        required: false,
        placeholder: 'Apt 2B',
      },
      {
        name: 'appartment',
        label: 'Appartment, unit or residence number',
        type: 'text',
        required: false,
        placeholder: 'Apt 2B',
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        required: true,
        placeholder: 'Toronto',
      },
      {
        name: 'postalCode',
        label: 'Postal Code',
        type: 'text',
        required: true,
        placeholder: 'M4B 3J1',
      },
      {
        name: 'province',
        label: 'Province',
        type: 'select',
        options: [
          { value: 'AB', label: '(AB) Alberta' },
          { value: 'BC', label: '(BC) British Columbia' },
          { value: 'MB', label: '(MB) Manitoba' },
          { value: 'NB', label: '(NB) New Brunswick' },
          { value: 'NL', label: '(NL) Newfoundland and Labrador' },
          { value: 'NS', label: '(NS) Nova Scotia' },
          { value: 'NT', label: '(NT) Northwest Territories' },
          { value: 'NU', label: '(NU) Nunavut' },
          { value: 'ON', label: '(ON) Ontario' },
          { value: 'PE', label: '(PE) Prince Edward Island' },
          { value: 'QC', label: '(QC) Québec' },
          { value: 'SK', label: '(SK) Saskatchewan' },
          { value: 'YT', label: '(YT) Yukon' },
        ],
        required: true,
        placeholder: '(ON) Ontario',
      },
    ],
  },
];

// This method could be abstracted away, to utils or a hook.
// Basically ask it "go fetch from X collection with Y ID and give any response as param to Z method K TNX BYE"
const setUserFromDataLayerIntoPersonalInfo = async ({ setPersonalInfo }) => {
  const userFromDataLayer = await getUser({ uid: auth.currentUser.uid });

  setPersonalInfo(userFromDataLayer);
};

const handleSubmit = async ({ data }) => {
  setUser({ uid: auth.currentUser.uid, user: data });
};

const PersonalInfo = () => {
  const [userFromAuth, isLoadingUserFromAuth] = useAuthState(auth);
  const [personalInfo, setPersonalInfo] = useState({ isLoading: true });

  useEffect(() => {
    setUserFromDataLayerIntoPersonalInfo({ setPersonalInfo });
  }, []);

  // Wait for User to be authenticated and their data loaded into the form
  if (isLoadingUserFromAuth || personalInfo.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Personal Info</h1>
      <div className="VerticalSpacer sm" />

      <h2>{userFromAuth.email}</h2>
      <div className="VerticalSpacer md" />

      <Form
        sections={sections}
        data={personalInfo}
        setData={setPersonalInfo}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PersonalInfo;
