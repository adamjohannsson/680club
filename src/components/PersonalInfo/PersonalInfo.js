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
      },
      {
        name: 'lastName',
        label: 'Last Name(s)',
        type: 'text',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    title: 'Address',
    fields: [
      {
        name: 'address',
        label: 'Address',
        type: 'text',
        required: true,
      },
      {
        name: 'appartment',
        label: 'Appartment, unit or residence number',
        type: 'text',
        required: true,
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        required: true,
      },
      {
        name: 'postalCode',
        label: 'Postal Code',
        type: 'text',
        required: true,
      },
      {
        name: 'province',
        label: 'Province',
        type: 'select',
        options: [
          'AB',
          'BC',
          'MB',
          'NB',
          'NL',
          'NS',
          'NT',
          'NU',
          'ON',
          'PE',
          'QC',
          'SK',
          'YT',
        ],
        required: true,
      },
    ],
  },
];

// TODO: move to Form component itself, or to utils if used in multiple components
const syncSectionsValues = ({ sections, data }) => {
  sections.map((section) => {
    section.fields.map((field) => {
      if (!field.name || (data[field.name] !== '' && !data[field.name])) {
        return;
      }

      field.value = data[field.name];
    });
  });
};

const setUserFromFirebaseIntoPersonalInfo = async ({ setPersonalInfo }) => {
  const user = auth.currentUser;
  const userFromFirebase = await getDoc(doc(db, 'users', user.uid));
  setPersonalInfo(userFromFirebase.data());
};

const handleChange = ({ personalInfo, setPersonalInfo }) => ({ target }) => {
  setPersonalInfo({ ...personalInfo, [target.name]: target.value });
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

  syncSectionsValues({ sections, data: personalInfo });

  return (
    <div>
      <h1>Personal Info</h1>
      <div className="VerticalSpacer sm" />

      <h2>{userFromAuth.email}</h2>
      <div className="VerticalSpacer md" />

      <Form
        sections={sections}
        onChange={handleChange({ personalInfo, setPersonalInfo })}
        onSubmit={() => handleSubmit({ personalInfo, userFromAuth })}
      />
    </div>
  );
};

export default PersonalInfo;
