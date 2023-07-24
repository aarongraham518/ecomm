import { createContext, useState } from "react";

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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
