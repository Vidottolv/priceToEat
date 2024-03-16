import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../controller';
import { useGlobalContext } from '../../context/produtoContext';
import { useFonts } from 'expo-font';

export function ModalMostraBase({ modalVisible, base, handleClose}) {
    
    // const { addToGlobalArray } = useGlobalContext(); // Extraímos addToGlobalArray diretamente do contexto
    const [loaded] = useFonts({
      'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-Var': require('../../../assets/fonts/Quicksand-VariableFont_wght.ttf'),
    });
    if (!loaded) {
      return null;
    }
    const renderizarComponentes = () => {
        if (!base?.listaCustos || base?.listaCustos.length === 0) {
          return <Text>Nenhum custo encontrado.</Text>;
        }
    
        // Array de componentes a serem renderizados
        const componentes = base?.listaCustos.map((custo, index) => (
          <View key={index}>
            <Text style={styles.titleProduto}>{custo?.produto}</Text>
            <Text style={styles.textProduto}>-Preço - R${custo?.preco}</Text>
            <Text style={styles.textProduto}>-Qtd Usada - {custo?.quantidade}</Text>
            <Text style={styles.textProduto}>-Custo - R${custo?.custo}</Text>
          </View>
        ));
    
        return componentes;
      };

    const navigation = useNavigation();
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title,styles.underline]}>{base?.Nome}</Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={handleClose}>
                        <Ionicons name='close-circle-outline' size={30} color={'#000'}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>
                    Custo da Base: R${base?.custoBase}
                </Text>
                    {renderizarComponentes()}
                {/* <Text style={styles.text}>AGORA DAQUI PRA BAIXO EU TENHO QUE DAR UM JEITO DE TRAZER AS INFOFRMAÇÕES DO COMPONENTE. TALVEZ NUMA FLATLIST</Text> */}
            </View>
          </View>
        </Modal>
      );
    };
    
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24,24,24,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        backgroundColor: '#D4E7C5',
        height: '70%',
        width: '80%',
        borderRadius: 22,
        borderWidth:4,
        borderColor:'#99BC85'
    },
    title: {
        fontSize: 26,
        fontFamily:'Quicksand-Bold',
        color: '#000',
        marginLeft: '7%',
        marginTop: '3%',
    },
    textButton: {
        color: '#000',
        fontSize: 16,
        fontFamily:'Quicksand-Bold',
    },
    backButton: {
        marginTop: '4%',
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
        fontSize:20,
        marginLeft:'7%',
        fontFamily:'Quicksand-Bold',
    },
    titleProduto:{
        color:'#000',
        fontSize:18,
        marginLeft:'7%',
        fontFamily:'Quicksand-Bold',
    },
    textProduto:{
        color:'#000',
        fontSize:16,
        marginLeft:'10%',
        marginRight:'7%',
        fontFamily:'Quicksand-Regular',    
    },
    underline: {
        textDecorationLine: 'underline'
       },
})
