// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'
import FinishSignIn from './FinishSignIn'; // brings the user back to sign in after magic link is sent


const firebaseConfig = {
    apiKey: "AIzaSyA5wM9z6ebkeTnG3ts16dKemY70aIv5v0Y",
    authDomain: "printboard-io.firebaseapp.com",
    projectId: "printboard-io",
    storageBucket: "printboard-io.appspot.com",
    messagingSenderId: "120948116942",
    appId: "1:120948116942:web:fa545d9b54b1ee85cd6f9f",
    measurementId: "G-YJS7MCP4BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app)

// collection ref
const colRef = collection(db, 'contacts')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    })

const auth = getAuth(app);

export { auth, db };
