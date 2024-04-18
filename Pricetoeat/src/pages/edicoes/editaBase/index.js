import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";

export default function EditarBaseScreen({ route, navigation }) {
  const [editedBase, setEditedBase] = useState(route.params.base);
  const cancelEdit = () => { navigation.goBack(); };

  const saveEdit = async () => {
    try {
        const baseRef = doc(firestore, 'bases', editedBase.id);
        let custoBase = 0;
        const newProdutosBase = editedBase.ProdutosBase.map(produto => {
            let custo = 0;
            if (produto.unidadeDeMedida === 5) {
              custo = produto.preco * produto.quantidade;
            } else {
              custo = (produto.preco / produto.tamanhoEmbalagem) * produto.quantidade;
            }
            custoBase += custo; 
            return { ...produto, custo: custo };
            });
            const editedBaseCopy = { ...editedBase, ProdutosBase: newProdutosBase, custoBase };
        await updateDoc(baseRef, editedBaseCopy);
        console.log('Produto atualizado com sucesso!');
        navigation.navigate('home');
    } catch (error) {
      console.error('Erro ao atualizar o produto:',error);
    }
  };

  const renderProdutosBase = () => {
    if (!editedBase || !editedBase.ProdutosBase || !Array.isArray(editedBase.ProdutosBase)) {
      return null;
    }
  
    return editedBase.ProdutosBase.map((produto, index) => (
      <View key={index}>
        <Text style={styles.subtitle}>Produto: {produto.produto}</Text>
        <TextInput
            value={produto.quantidade.toString()}
            onChangeText={(text) => {
              if (/^\d+$/.test(text) || text === '') { // Verifica se o texto é um número ou está vazio
                const newProdutosBase = [...editedBase.ProdutosBase];
                newProdutosBase[index].quantidade = text === '' ? 0 : parseInt(text);
                setEditedBase({...editedBase, ProdutosBase: newProdutosBase});
              }
            }}
            placeholder="Quantidade"
            keyboardType="numeric"
            style={styles.input}
            />
        </View>
    ));
  };  

  return (
    <View style={styles.container}>
      <animatable.View animation={'fadeInRight'} style={{width:'100%'}}>
        <View style={styles.headerModal}>
          <Text style={[styles.title, styles.underline]}>Editar Base</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => cancelEdit()}>
            <Ionicons
              size={30}
              color={'#99BC85'}
              name='home'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.compound}>
          {renderProdutosBase()}
          <TouchableOpacity 
            style={styles.buttonCadastrar}
            onPress={saveEdit}
          >
            <Text style={styles.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        width:'100%'
    },
    compound: {
        paddingLeft: 20,
        paddingRight: 20,
        width:'100%'
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
    subtitle: {
      fontSize: 20,
      fontFamily: 'Quicksand-Regular',
      color: '#99BC85',
      marginBottom: '1%',
      borderColor: '#000',
  },
    input: {
        color: '#000',
        backgroundColor: '#E1F0DA',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        height: 40,
        fontSize: 14,
        borderColor: '#99BC85',
        marginBottom:15
    },
    backButton: {
        marginRight: '5%',
        marginTop: '13%'
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5',
        height: 130,  
    },
    underline: {
        textDecorationLine: 'underline'
    },
    buttonCadastrar: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 45,
        width: '100%',
        marginTop: 10,
        marginBottom: 6,
        padding: 4,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5'
    },
    textButton: {
        color: '#000',
        fontFamily: 'Quicksand-Regular',
        alignSelf: 'center'
    }
})

