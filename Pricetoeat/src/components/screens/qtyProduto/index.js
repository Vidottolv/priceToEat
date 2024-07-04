import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore, auth } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

export default function QtyProdutos({ route, navigation }) {
    const { receita } = route.params;
    const [quantidades, setQuantidades] = useState({});
    const encontrarProdutosCustoZero = () => {
        if (!receita?.ProdutosReceita || receita?.ProdutosReceita.length === 0) {
        return [];
        }
    return receita?.ProdutosReceita.filter(custo => custo.custo === 0);
    };
    const produtosCustoZero = encontrarProdutosCustoZero();
    const handleQuantidadeChange = (nomeProduto, quantidade) => {
        setQuantidades(prevState => ({
            ...prevState,
            [nomeProduto]: quantidade
        }));
    };

    const handleSalvarQuantidades = async () => {
        const usuario = auth.currentUser;
        if (usuario) {
            const receitaRef = doc(firestore, 'receitas', receita.id);
            const novoProdutosReceita = receita.ProdutosReceita.map(produto => {
                const quantidade = quantidades[produto.produto] ? parseInt(quantidades[produto.produto]) : produto.quantidade;
                const custo = (produto.preco / produto.tamanhoEmbalagem) * quantidade;
                return {
                    ...produto,
                    quantidade,
                    custo
                };
            });
        const custoReceita = novoProdutosReceita.reduce((acc, produto) => acc + produto.custo, 0);
        const docData = {
            ProdutosReceita: novoProdutosReceita,
            custoReceita
        };
        try {
            await updateDoc(receitaRef, docData);
            console.log(updateDoc, receitaRef)
            console.log('Quantidades e custos atualizados com sucesso!');
            showMessage({
              backgroundColor: '#0bbd29',
              message: "Sucesso na atualização das quantidades.",
              type: 'success',
          })
            setTimeout(() => 
              navigation.navigate('home'), 
              duration = 1000);
        } catch (error) {
          showMessage({
            backgroundColor: '#E06F72',
            message: "Erro na atualização das quantidades.",
            type: 'warning',
            duration:2500
          });
            console.error('Erro ao atualizar as quantidades e custos:', error);
        }
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerModal}>
            <Text style={[styles.title, styles.underline]}>Editar quantidades</Text>
            <TouchableOpacity 
                style={styles.icon}
                onPress={() => navigation.navigate('home')}>
                <Ionicons 
                    size={35} 
                    color={'#99BC85'} 
                    name='home-outline'/>
            </TouchableOpacity>
        </View>
        {produtosCustoZero.map((produto, index) => (
            <View key={index} style={styles.produtoContainer}>
            <Text style={styles.produtoText}>{produto.produto}:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Quantidade"
                value={quantidades[produto.produto] ? quantidades[produto.produto].toString() : ''}
                onChangeText={text => handleQuantidadeChange(produto.produto, text)}/>
            </View>
        ))}
        <TouchableOpacity style={styles.buttonSalvar} onPress={handleSalvarQuantidades}>
            <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    height:'100%',
    width:'100%'
  },
  icon:{
    marginTop:'15%',
    marginRight:'5%'
  },
  headerModal:{
    flexDirection:'row',
    backgroundColor: '#D4E7C5',
    width:'100%',
    height:130,
    marginBottom:'5%',
    borderBottomWidth:3,
    borderColor:'#99BC85',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    color: '#99BC85',
    marginLeft: '3%',
    marginTop: '13%',
    textShadowRadius: 4,
    textShadowColor: '#BFD8AF',
    textShadowOffset: {
      width: 4,
      height: 2
    }
  },
  underline: {
    textDecorationLine: 'underline'
  },
  produtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  produtoText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: '#000'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#E1F0DA',
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    fontSize: 14,
    borderColor: '#99BC85'
  },
  buttonSalvar: {
    width:'60%',
    marginTop: 20,
    padding: 10,
    borderRadius: 30,
    height:50,
    backgroundColor: '#000',
  },
  buttonVoltar: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#99BC85'
  },
  textButton: {
    fontSize: 18,
    fontFamily: 'Quicksand-Regular',
    color: '#E1F0DA',
    textAlign: 'center'
  }
});
