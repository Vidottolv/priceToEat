import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../controller';

export function useReceitasData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
        try {
          const receitasSnapshot = getDocs(collection(firestore, 'receitas'));
          const receitasArray = receitasSnapshot.docs.map(doc => ({
            value: doc.id,
            label: doc.data().nomeReceita
          }));
          setData(receitasArray);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.error('Erro ao consultar receitas:', error);
        }
      } else {
        setLoading(false);
        setError(new Error("Usuário não autenticado"));
      }
    return () => unsubscribe();
  }, []);
  
  return { data, loading, error };
}
