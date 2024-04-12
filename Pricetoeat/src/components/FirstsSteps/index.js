import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


export default function FirstSteps (){
  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Var': require('../../assets/fonts/Quicksand-VariableFont_wght.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            {/* <Text style={[styles.title, styles.underline]}></Text> */}
            <TouchableOpacity
              style={styles.backButton}>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>
              1 - Exemplo de um cadastro de um produto
            </Text>
            <View style={styles.image}>
                    {/* <Image source={require('../../assets/exemploCadastroProduto.png')} /> */}
                </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
          onPress={() => navigation.goBack()}
            style={styles.botaoReceita}>
            <Text style={[styles.textoReceita, styles.underline]}>Add numa receita</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.botaoReceita}>
              <Text style={[styles.textoReceita,styles.underline]}>Editar quantidades</Text>              
            </TouchableOpacity> */}
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
    height: '90%',
    width: '90%',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#99BC85',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 26,
    fontFamily: 'Quicksand-Bold',
    color: '#000',
    marginLeft: '7%',
    marginTop: '3%',
  },
  backButton: {
    marginTop: '4%',
    marginRight: '5%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    width: '90%'
  },
  bottom: {
    display:'flex',
    flexDirection:'row',
    position: 'absolute',
    bottom: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    columnGap:10
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginLeft: '7%',
    fontFamily: 'Quicksand-Bold',
  },
  titleProduto: {
    color: '#000',
    fontSize: 18,
    marginLeft: '7%',
    fontFamily: 'Quicksand-Bold',
  },
  textProduto: {
    color: '#000',
    fontSize: 16,
    marginLeft: '10%',
    marginRight: '7%',
    fontFamily: 'Quicksand-Regular',
  },
  underline: {
    textDecorationLine: 'underline'
  },
  botaoReceita: {
    marginTop: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: '35%',
    padding: 4,
    borderRadius: 40,
    backgroundColor: '#99BC85'
  },
  textoReceita: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14
  },
  centro:{
    marginTop:'5%',
    alignItems:'center'
  }
})
