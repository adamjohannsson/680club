
import clubApi from '../integrations/clubApi';
import { db } from '../utils/firebase.init';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  limit,
  orderBy,
  addDoc,
  where,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';


/* Helpers */
const udpateDocWithTimestamps = async ({collectionPath, data, merge = true}) => {
  const currentDate = new Date();

  // active and createdAt can be overridden by data, updatedAt can not.
  const dataToPersist = {
    active: true,
    createdAt: currentDate,
    ...data,
    updatedAt: currentDate,
  };

  // If data has no id, create new document in collection.
  if(!data.id) {
    const collectionRef = collection(db, collectionPath);

    return await addDoc(collectionRef, dataToPersist);
  }

  const docRef = doc(db, `${collectionPath}/${data.id}`);
  // @TODO: handle document not found
  return await setDoc(docRef, dataToPersist, { merge });
}

const deactivateDoc = async ({ docRef }) => {
  const currentDate = new Date();

  await updateDoc(docRef, { active: false, deactivatedAt: currentDate });
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

// Convert Firestore doc to a flat JSON object
const getDocAsJson = async ({ docRef }) => {
  const docSnap = await getDoc(docRef);

  return { ...docSnap.data(), id: docSnap.id };
};

// Convert Firestore query results to a list of flat JSON objects
const getDocsAsJson = async ({ query }) => {
  const querySnapshot = await getDocs(query);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

// Validate an object has a set of expected keys
const checkObjectHasKeys = (object, keys) => {
  return keys.every((key) => object.hasOwnProperty(key));
};

const setCallbackAfterGetDoc = async ({ docRef, callback }) => {
  const doc = await getDocAsJson({ docRef });
  callback({doc});
};

const setCallbackAfterGetList = async ({ query, callback }) => {
  const docs = await getDocsAsJson({ query });

  callback({ docs });
};


/* Credit Card */
const creditCard = {
  create: async ({ clubUserId, cardNumber }) => {
    return await clubApi.creditCard.create({ clubUserId, cardNumber });
  }
}


/* Customer */
const customer = {
  get: async ({ clubUserId, email }) => {
    return await clubApi.customer.getOrCreate({ clubUserId, email });
  },
  onGet: async ({ clubUserId, email, callback }) => {
    const customer = await clubApi.customer.getOrCreate({ clubUserId, email });
    callback({ customer });
  },
}


/* Connected Account */
const connectedAccount = {
  update: async ({ connectedAccount }) => {
    const dataToPersist = {
      ...connectedAccount,
      number: null, // IMPORTANT: do NOT persist plain text card number
    };

    delete dataToPersist.number;

    return await udpateDocWithTimestamps({
      collectionPath: `users/${connectedAccount.userId}/connectedAccounts`,
      data: dataToPersist,
    });
  },
  onGet: async ({ userId, connectedAccountId, callback }) => {
    setCallbackAfterGetDoc({
      docRef: doc(db, `users/${userId}/connectedAccounts`, connectedAccountId),
      callback,
    });
  },
  onGetList: async ({ userId, active = true, callback }) => {
    const q = query(
      collection(db, `users/${userId}/connectedAccounts`),
      where('active', '==', active),
      orderBy('createdAt', 'desc'),
    );;

    setCallbackAfterGetList({ query: q, callback });
  },
}

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


/* User */
const user = {
  update: async ({ user }) => {
    await udpateDocWithTimestamps({ collectionPath: `users`, data: user });
  },
  onGet: async ({ id, callback }) => {
    const document = await getDocAsJson({ docRef: doc(db, 'users', id) });

    callback({ document });
  },
}

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

const dataLayer = {
  user,
  customer,
  creditCard,
  connectedAccount,
}

export {
  dataLayer,
  getUser,
  setUser,
  removeConnectedAccount,
};
