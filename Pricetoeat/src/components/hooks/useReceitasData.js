import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../controller';

export function useReceitasData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const receitasSnapshot = await getDocs(collection(firestore, 'receitas'));
          const receitasArray = receitasSnapshot.docs.map(doc => ({
            value: doc.id,
            label: doc.data().Nome
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
    });

    return () => unsubscribe();
  }, []);

  const atualizarReceita = async (idReceita, novoDado) => {
    try {
      console.log(idReceita);
      console.log(novoDado);
      const receitaRef = doc(firestore, 'receitas', idReceita);
      await updateDoc(receitaRef, novoDado);
      console.log('Receita atualizada com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
    }
  };

  return { data, loading, error, atualizarReceita };
}
