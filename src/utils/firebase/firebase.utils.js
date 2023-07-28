//Initialize app
import { initializeApp } from "firebase/app";

//Authentication
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//Database docs
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch, 
  query, 
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAejA4I23h81W24rv-U5d0YCfrJ3RzlWb4",
  authDomain: "crown-clothing-store-45d78.firebaseapp.com",
  projectId: "crown-clothing-store-45d78",
  storageBucket: "crown-clothing-store-45d78.appspot.com",
  messagingSenderId: "871596150412",
  appId: "1:871596150412:web:cfe1b062172d91ef8575a9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//testing different signin option 'redirect'
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');  
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  //generate a query off of the collectionRef and will give us an object for a snapshot
  const q = query(collectionRef);

  //document snapshot based on collectionRef (fetching the docs)
  const querySnapShot = await getDocs(q);

  const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {

  })

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  //db, collection, identifier
  //give me the doc reference in the db under the users collection
  //with an id of userAuth.uid
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists())

  //if user data does not exist
  //create / set the document with the
  //data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  //return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//whenever auth changes, our callback will be called
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
