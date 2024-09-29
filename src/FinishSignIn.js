// src/FinishSignIn.js
import React, { useEffect, useState } from 'react';
import { signInWithEmailLink, isSignInWithEmailLink } from 'firebase/auth';
import { auth } from './firebaseConfig';

function FinishSignIn() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const completeSignIn = async () => {
      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        setMessage('No email found for sign-in. Please try again.');
        return;
      }
      if (isSignInWithEmailLink(auth, window.location.href)) {
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn'); // Remove email from storage
          setMessage('Sign-in successful! You are now logged in.');
        } catch (error) {
          console.error('Error completing sign-in:', error);
          setMessage(`Error: ${error.message}`);
        }
      }
    };
    completeSignIn();
  }, []);

  return <div>{message && <p>{message}</p>}</div>;
}

export default FinishSignIn;
