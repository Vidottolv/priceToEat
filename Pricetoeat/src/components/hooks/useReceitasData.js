import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../controller';

export function useReceitasData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const receitasSnapshot = await getDocs(collection(firestore, 'receitas'));
          const receitasArray = receitasSnapshot.docs.map(doc => ({
            value: doc.id,
            label: doc.data().nomeReceita
          }));
          setData(receitasArray);
        } catch (error) {
          console.error('Erro ao consultar receitas:', error);
        }
      } else {
        setError(new Error("Usuário não autenticado"));
      }
    });

    return () => unsubscribe();
  }, []);
  
  return { data };
}
