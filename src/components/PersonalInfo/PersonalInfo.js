import Form from '../Form/Form';
import Loading from '../Global/Loading';
import { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';

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
const setUserFromFirebaseIntoPersonalInfo = async ({ setPersonalInfo }) => {
  const user = auth.currentUser;
  const userFromFirebase = await getDoc(doc(db, 'users', user.uid));
  setPersonalInfo(userFromFirebase.data());
};

const handleChange =
  ({ personalInfo, setPersonalInfo }) =>
  ({ target }) => {
    const [name, value] = target.name
      ? [target.name, target.value]
      : [target.attributes.name.value, target.attributes.value.value];
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

const handleSubmit = async ({ personalInfo, userFromAuth }) => {
  try {
    const docRef = doc(db, 'users', userFromAuth.uid);
    setDoc(docRef, { ...personalInfo }, { merge: true });
  } catch (error) {
    // TODO: handle this
    console.error('Error adding document: ', error);
  }
};

const PersonalInfo = () => {
  const [userFromAuth, isLoadingUserFromAuth] = useAuthState(auth);
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    setUserFromFirebaseIntoPersonalInfo({ setPersonalInfo });
  }, []);

  // Wait for User to be authenticated
  if (isLoadingUserFromAuth) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Personal Info</h1>
      <div className="VerticalSpacer sm" />

      <h2>{userFromAuth.email}</h2>
      <div className="VerticalSpacer md" />

      <Form
        data={personalInfo}
        sections={sections}
        onChange={handleChange({ personalInfo, setPersonalInfo })}
        onSubmit={() => handleSubmit({ personalInfo, userFromAuth })}
      />
    </div>
  );
};

export default PersonalInfo;
