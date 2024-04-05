import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

export default function EditarReceitaScreen() {
    const navigation = useNavigation();
//   const [editedProduto, setEditedProduto] = useState(route.params.produto);
  const cancelEdit = () => { navigation.goBack(); };

//   const saveEdit = async () => {
//     try {
//         const produtoRef = doc(firestore, 'produtos', editedProduto.id);
//         const docData = {
//             Nome: editedProduto?.Nome,
//             PrecoProd: parseInt(editedProduto?.PrecoProd), 
//         }
//         await updateDoc(produtoRef, docData);
//         console.log('Produto atualizado com sucesso!');
//         navigation.navigate('home');
//     } catch (error) {
//       console.error('Erro ao atualizar o produto:',error);
//     }
//   };

  return (
   <View style={styles.container}>
    <animatable.View animation={'fadeInRight'} style={{width:'100%'}}>
        <View style={styles.headerModal}>
            <Text style={[styles.title, styles.underline]}>Editar Receita</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => cancelEdit()}>
                    <Ionicons
                        size={30}
                        color={'#99BC85'}
                        name='home'/>
                </TouchableOpacity>
            </View>
        <View style={styles.compound}>
            

            <Text style={styles.subtitle}>Nome do produto</Text>
            <TextInput
                // onChangeText={(text) => setEditedProduto({ ...editedProduto, Nome: text })}
                placeholder="Nome"
                style={styles.input}/>
            <Text style={styles.subtitle}>Preço do produto</Text>
            <TextInput
                // onChangeText={(text) => {
                //     const numericValue = text.replace(/[^0-9]/g, '');
                //     setEditedProduto({ ...editedProduto, PrecoProd: numericValue });
                // }}
                placeholder="Preço"
                keyboardType="numeric"
                style={styles.input}/>
                <TouchableOpacity 
                    style={styles.buttonCadastrar}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
        </View>
    </animatable.View>
    </View>
  )
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
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 2,
            height: 2
        },
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

