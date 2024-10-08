import { db } from "../utils/firebase.init";
import { collection, doc, getDoc, getDocs, query, setDoc, startAfter, limit, orderBy, addDoc } from "firebase/firestore";

// Add createdAt and updatedAt to data and merge into an existing document
const mergeDocWithTimestamps = async ({docRef, data}) => {
  const currentDate = new Date();
  const now = currentDate.getTime();

  const dataToPersist = { ...data, createdAt: now, updatedAt: now };

  await setDoc(docRef, dataToPersist, { merge: true });
}

// Add createdAt and updatedAt to data and create a new document with auto-generated id
const addDocWithTimestamps = async ({collectionRef, data}) => {
  const currentDate = new Date();
  const now = currentDate.getTime();

  const dataToPersist = { ...data, createdAt: now, updatedAt: now };

  await addDoc(collectionRef, dataToPersist);
}

// Convert Firestore query results to a list of flat JSON objects
const getDocsAsJson = async ({query}) => {
  const querySnapshot = await getDocs(query);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

// Validate an object has a set of expected keys
const checkObjectHasKeys = (object, keys) => {
  return keys.every(key => object.hasOwnProperty(key));
};

const getCreditAccounts = async ({ uid, amount = 100, startDocRef = null}) => {
  const q = query(collection(db, `users/${uid}/creditAccounts`), orderBy('createdAt', 'desc'), limit(amount));

  return getDocsAsJson({query: q});
};

const setCreditAccount = async ({ uid, creditAccount }) => {
  if(creditAccount.id) {
    const docRef = doc(db, `users/${uid}/creditAccounts`, creditAccount.id);

    mergeDocWithTimestamps({docRef, data: creditAccount});
  } else {
    const collectionRef = collection(db, `users/${uid}/creditAccounts`);

    addDocWithTimestamps({collectionRef, data: creditAccount});
  }
};

const getUser = async ({ uid, requiredKeys = [] }) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  const user = userDoc.data();

  if (!checkObjectHasKeys(user, requiredKeys)) {
    // Let developer know User object does not have all keys expected by consumer
    throw new Error('User object does not have the required keys');
  }

  return user;
};

const setUser = async ({ uid, user }) => {
  const docRef = doc(db, 'users', uid);

  mergeDocWithTimestamps({docRef, user});
};

export { getUser, setUser, getCreditAccounts, setCreditAccount };
