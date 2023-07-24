import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

//as the actual value you want ot access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//provider component that will wrap around any component that
//needs access to the Context values, "UserContext"
//every context built includes a provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        //call with user response (response);
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    })

    //on unmount
    return unsubscribe
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
