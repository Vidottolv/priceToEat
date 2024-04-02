import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../controller';
import { useGlobalContext } from '../../context/produtoContext';
import { useFonts } from 'expo-font';

export function ModalAdicionar({ produto, handleClose }) {
    const { addToGlobalArray } = useGlobalContext();
    const [loaded] = useFonts({
      'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-Var': require('../../../assets/fonts/Quicksand-VariableFont_wght.ttf'),
    });
    if (!loaded) {
      return null;
    }

    async function addProdutoArray(produto) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            addToGlobalArray(produto);
            handleClose();
          } catch (error) {
            console.error('erro', error);
          }
        }
      });
    }
  
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={styles.title}>Adicionar produto?</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => handleClose()}>
              <Ionicons size={35} color={'#000'} name='close-circle-outline' />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Aceite a adição do Produto para que ele faça parte da base.</Text>
          <View style={styles.centerModal}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addProdutoArray(produto)}>
              <Text style={styles.textButton}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleClose()}>
              <Text style={styles.textButton}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24,24,24,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        backgroundColor: '#D4E7C5',
        height: '25%',
        width: '80%',
        borderRadius: 22,
        borderWidth:4,
        borderColor:'#99BC85'
    },
    title: {
        fontSize: 24,
        fontFamily:'Quicksand-Bold',
        color: '#000',
        marginLeft: '7%',
        marginTop: '3%'
    },
    textButton: {
        color: '#000',
        fontSize: 16,
        fontFamily:'Quicksand-Bold',
    },
    backButton: {
        marginTop: '3%',
        marginRight: '5%',
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    centerModal: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 25,
        height: 40,
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        color:'#000',
        fontSize:15,
        marginLeft:'7%',
        marginRight:'7%',
        fontFamily:'Quicksand-Regular',
    }
})
