import { db } from '../utils/firebase.init';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  startAfter,
  limit,
  orderBy,
  addDoc,
  where,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const deactivateDoc = async ({ docRef }) => {
  const currentDate = new Date();
  const now = currentDate.getTime();

  await updateDoc(docRef, { active: false, deactivatedAt: now });
};

// Add standard fields to data and merge into existing document
const mergeDocWithTimestamps = async ({ docRef, data }) => {
  const currentDate = new Date();

  // active and createdAt can be overridden by data, updatedAt can not.
  const dataToPersist = {
    active: true,
    createdAt: currentDate,
    ...data,
    updatedAt: currentDate,
  };

  await setDoc(docRef, dataToPersist, { merge: true });
};

// Add standard fields to data and create new document with auto-generated id to given collection
const addDocWithTimestamps = async ({ collectionRef, data }) => {
  const currentDate = new Date();

  // active can be overridden by data, createdAt and updatedAt can not.
  const dataToPersist = {
    active: true,
    ...data,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  await addDoc(collectionRef, dataToPersist);
};

// Convert Firestore query results to a list of flat JSON objects
const getDocsAsJson = async ({ query }) => {
  const querySnapshot = await getDocs(query);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

// Convert Firestore doc to a flat JSON object
const getDocAsJson = async ({ docRef }) => {
  const docSnap = await getDoc(docRef);

  return { ...docSnap.data(), id: docSnap.id };
};

// Validate an object has a set of expected keys
const checkObjectHasKeys = (object, keys) => {
  return keys.every((key) => object.hasOwnProperty(key));
};

const getConnectedAccount = async ({
  uid,
  connectedAccountId,
  requiredKeys = [],
}) => {
  const connectedAccount = await getDocAsJson({
    docRef: doc(db, `users/${uid}/connectedAccounts`, connectedAccountId),
  });

  if (!checkObjectHasKeys(connectedAccount, requiredKeys)) {
    // Let developer know User object does not have all keys expected by consumer
    throw new Error('Connected account object does not have the required keys');
  }

  return connectedAccount;
};

const getConnectedAccounts = async ({
  uid,
  amount = 100,
  active = true,
  startDocRef = null,
}) => {
  const q = query(
    collection(db, `users/${uid}/connectedAccounts`),
    where('active', '==', active),
    orderBy('createdAt', 'desc'),
    limit(amount),
  );

  return await getDocsAsJson({ query: q });
};

const setConnectedAccount = async ({ uid, connectedAccount }) => {
  if (connectedAccount.id) {
    const docRef = doc(
      db,
      `users/${uid}/connectedAccounts`,
      connectedAccount.id,
    );

    mergeDocWithTimestamps({ docRef, data: connectedAccount });
  } else {
    const collectionRef = collection(db, `users/${uid}/connectedAccounts`);

    addDocWithTimestamps({ collectionRef, data: connectedAccount });
  }
};

const removeConnectedAccount = async ({
  uid,
  connectedAccountId,
  permanently = false,
}) => {
  if (permanently) {
    const docRef = doc(
      db,
      `users/${uid}/connectedAccounts`,
      connectedAccountId,
    );

    await deleteDoc(docRef);
  } else {
    const docRef = doc(
      db,
      `users/${uid}/connectedAccounts`,
      connectedAccountId,
    );

    deactivateDoc({ docRef });
  }
};

const getUser = async ({ uid, requiredKeys = [] }) => {
  const user = await getDocAsJson({ docRef: doc(db, 'users', uid) });

  if (!checkObjectHasKeys(user, requiredKeys)) {
    // Let developer know User object does not have all keys expected by consumer
    throw new Error('User object does not have the required keys');
  }

  return user;
};

const setUser = async ({ uid, user }) => {
  const docRef = doc(db, 'users', uid);

  const docSnap = await getDoc(docRef);

  if(!docSnap.exists()) {
    // TODO: change this model
    // from "save this info in Users table"
    // to "save all club payments into a club payments collection or table"
    user.isSubscriptionActive = false;
    user.lastClubPaymentTimestamp = new Date("Jan 1 1970");
    user.lastClubPaymentAmount = 0;
  }

  mergeDocWithTimestamps({ docRef, data: user });
};

export {
  getUser,
  setUser,
  getConnectedAccounts,
  getConnectedAccount,
  setConnectedAccount,
  removeConnectedAccount,
};
