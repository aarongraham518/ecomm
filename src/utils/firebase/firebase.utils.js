//Initialize app
import { initializeApp } from "firebase/app";

//Authentication
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//Database docs
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    //db, collection, identifier
    //give me the doc reference in the db under the users collection 
    //with an id of userAuth.uid
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists())

    //if user data does not exist
    //create / set the document with the 
    //data from userAuth in my collection
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch (error){
            console.log('error creating the user', error.message)
        }
    }   

    //if user data exists
    //return userDocRef
    return userDocRef;
}