import React, { createContext, useContext, useState } from 'react';
import { Firestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../controller';
import { onAuthStateChanged } from 'firebase/auth';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalArray, setGlobalArray] = useState([]);
  const [receitaArray, setReceitaArray] = useState([]);

  const addToGlobalArray = (item) => {
    setGlobalArray((prevArray) => {
      const newArray = [...prevArray, item];
      // console.log(newArray);
      return newArray;
    });
  };  
  const AddToReceitaArray = (item) => {
    setReceitaArray((prevArray) => {
      const newArray = [...prevArray, item];
      console.log(newArray);
      return newArray;
    });
  };  

  const cadastrarReceita = async (nome) => {
    const usuario = onAuthStateChanged(auth, (user) => {
      if(user) {
        try {
          const snapshot = getDocs(collection(firestore,'receitas')); 
          const docRef = addDoc(collection(firestore,'receitas'),{
            Nome:nome,
            Detalhes:receitaArray,
            IDUsuario:user.uid
          });
          for(let i = 0; i <receitaArray.length; i++) {
            removeItemFromReceitaArray();
          }
          console.log('Receita cadastrada');
        } catch (error) {
          console.error('Erro ao cadastrar a receita:', error);
        }
      }
    })
  };

  const removeItemFromGlobalArray = (index) => {
    const newArray = [...globalArray];
    newArray.splice(index, 1);
    setGlobalArray(newArray);
    // console.log(newArray)
  };

  const removeItemFromReceitaArray = (index) => {
    const newArray = [...globalArray];
    newArray.splice(index, 1);
    setReceitaArray(newArray);
    // console.log(newArray)
  };

  return (
    <GlobalContext.Provider
      value={{
        globalArray,
        addToGlobalArray,
        removeItemFromGlobalArray,
        receitaArray,
        AddToReceitaArray,
        removeItemFromReceitaArray,
        cadastrarReceita
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
