import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../controller';
import { useGlobalContext } from '../context/produtoContext';
import { useFonts } from 'expo-font';

export function NomearReceita({ produto }) {
    const { addToGlobalArray } = useGlobalContext(); 
    const [nomeReceita, setNomeReceita] = useState('');
    const [loaded] = useFonts({
      'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-Var': require('../../assets/fonts/Quicksand-VariableFont_wght.ttf'),
    });
    if (!loaded) {
      return null;
    }

    // async function addProdutoArray(produto) {
    //   onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //       try {
    //         addToGlobalArray(produto);
    //         handleClose();
    //       } catch (error) {
    //         console.error('erro', error);
    //       }
    //     }
    //   });
    // }
  
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nomeie a Receita</Text>
        <TextInput
          placeholderTextColor={'#515151'}
          value={nomeReceita}
          onChangeText={(value) => setNomeReceita(value)}
          style={styles.textinput}/>
            <TouchableOpacity 
              onPress={navigation.navigate('home')}
              style={styles.button}>
              <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>    
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent:'center',
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
      fontSize: 30,
      fontFamily:'Quicksand-Bold',
      color: '#000',
      marginTop: '3%',
    },
    textButton: {
      color: '#FFF',
      fontSize: 16,
      fontFamily:'Quicksand-Bold',
    },
    backButton: {
      marginTop: '3%',
      marginRight: '5%',
    },
    headerModal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:'10%'
    },
    centerModal: {
      marginTop: '10%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      marginTop:20,
      borderWidth: 2,
      borderWidth: 2,
      borderRadius: 25,
      height: 40,
      width: '65%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#000'
    },
  textinput:{
    color:'#515151',
    borderBottomWidth:1,
    width:'65%',
    fontSize:15,
    fontFamily:'Quicksand-Regular',

  },
})
