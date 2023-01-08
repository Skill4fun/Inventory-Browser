import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext({});

export const useNavbarContext = () => useContext(NavbarContext);

export default function NavbarContextProvider({ children }) {
  const [isInventoryClicked, setIsInventoryClicked] = useState();
  const [isListClicked, setIsListClicked] = useState();
  return (
    <NavbarContext.Provider
      value={{
        isInventoryClicked,
        setIsInventoryClicked,
        isListClicked,
        setIsListClicked,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
