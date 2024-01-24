import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalArray, setGlobalArray] = useState([]);

  const addToGlobalArray = (item) => {
    setGlobalArray((prevArray) => {
      const newArray = [...prevArray, item];
      console.log(newArray);
      return newArray;
    });
  };  

  const removeItemFromGlobalArray = (index) => {
    const newArray = [...globalArray];
    newArray.splice(index, 1);
    setGlobalArray(newArray);
    console.log(newArray)
  };

  return (
    <GlobalContext.Provider
      value={{
        globalArray,
        addToGlobalArray,
        removeItemFromGlobalArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
