import React, { createContext, useContext, useState } from 'react';
import { Firestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../controller';

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
      // console.log(newArray);
      return newArray;
    });
  };  

  const cadastrarReceita = async (nome) => {
    const usuario = auth.currentUser;
      if(usuario) {
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
  };

  const removeItemFromGlobalArray = (index) => {
    const newArray = [...globalArray];
    newArray.splice(index, 1);
    setGlobalArray(newArray);
    // console.log(newArray)
  };

  const cleanGlobalArray = () => {
    setGlobalArray([]);
  }
  const cleanReceitaArray = () => {
    setReceitaArray([]);
  }

  const removeItemFromReceitaArray = (index) => {
    const newArray = [...receitaArray];
    newArray.splice(index, 1);
    setReceitaArray(newArray);
  };
  

  return (
    <GlobalContext.Provider
      value={{
        globalArray,
        addToGlobalArray,
        removeItemFromGlobalArray,
        cleanGlobalArray,
        receitaArray,
        AddToReceitaArray,
        removeItemFromReceitaArray,
        cleanReceitaArray
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
