import React, { createContext, useContext, useState } from 'react';
import { getDataFromToken } from './utils';

export const LoggedInUserContext = createContext({});

export const useLoggedInUserContext = () => useContext(LoggedInUserContext);

export default function LoggedInUserContextProvider({ children }) {
  const storedJwt = localStorage.getItem('browserTableToken');
  const [loggedInUser, setLoggedInUser] = useState(storedJwt ? getDataFromToken(storedJwt) : {});
  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
}
