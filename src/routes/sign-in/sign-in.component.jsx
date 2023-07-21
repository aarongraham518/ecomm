import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export const SignIn = () => {
    useEffect(() => {
        async function getRedirect(){
            const response = await getRedirectResult(auth)
       
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getRedirect()
    }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    //call with user response (response);
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};
