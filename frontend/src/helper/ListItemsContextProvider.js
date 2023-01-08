import React, { createContext, useContext, useState } from 'react';

const ListItemsContext = createContext({});

export const useListItemsContext = () => useContext(ListItemsContext);

export default function ListItemsContextProvider({ children }) {
  const [listItems, setListItems] = useState([]);
  const [addToListClicked, setAddToListClicked] = useState(false);
  return (
    <ListItemsContext.Provider
      value={{
        listItems,
        setListItems,
        addToListClicked,
        setAddToListClicked,
      }}
    >
      {children}
    </ListItemsContext.Provider>
  );
}
