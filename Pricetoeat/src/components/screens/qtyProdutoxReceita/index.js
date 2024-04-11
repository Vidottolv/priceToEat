import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { firestore, auth } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";

export default function QtyProdutos({ route, navigation }) {
    const { receita, nome, tamanho, custoprod, unidadeprod, idReceita} = route.params;
    const [quantidadeProduto, setQuantidadeProduto] = useState(''); 
    const cancelEdit = () => { navigation.goBack(); };

  const saveEdit = async () => {
    if (quantidadeProduto != 0) {
        try {
          const usuario = auth.currentUser;
            if(user) {
        const receitaRef = doc(firestore, 'receitas', idReceita);
        let custoQuant = 0;
            if (unidadeprod == 5) {
              custoQuant = custoprod * parseInt(quantidadeProduto);
            } else {
              custoQuant = (custoprod / tamanho) * parseInt(quantidadeProduto);
            }
        const docData = {
                quantidade: parseInt(quantidadeProduto),
                custo: custoQuant
            };
        await updateDoc(receitaRef, docData);
        console.log('Produto atualizado com sucesso!');
        navigation.navigate('home');
        }
    } catch (error) {
      console.error('Erro ao atualizar o produto:',error);
    }
  }
}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, styles.underline]}>Editar Produto</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                </TouchableOpacity>
            </View>
            <View style={styles.compound}>
            <Text style={styles.subtitle}>Nome da Receita: {receita}</Text>
            <Text style={styles.subtitle}>Nome do Produto: {nome}</Text>
            <TextInput
                value={quantidadeProduto.toString()}
                onChangeText={text => setQuantidadeProduto(parseInt(text) || 0)}
                placeholder="Quantidade do Produto"
                keyboardType="numeric"
                style={styles.input}/>
            <TouchableOpacity 
                style={styles.buttonCadastrar}
                onPress={saveEdit}>
                <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}


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
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        fontFamily: 'Quicksand-Regular',
        color: '#000',
        marginBottom: '1%',
        borderColor: '#000',
        marginBottom:'4%'
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
        height: '25%',  
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

