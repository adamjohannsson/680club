import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

const actionCodeSettings = {
  // URL where User lands after clicking link they get in their email.
  // URL must be in the authorized domains list in the Firebase Console.
  // TODO: change this for an environment variable
  url: `${process.env.REACT_APP_HTTP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}/login-finish-after-clicking-email-link`,
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

export { actionCodeSettings };
export const db = getFirestore(app);
export const auth = getAuth(app);
