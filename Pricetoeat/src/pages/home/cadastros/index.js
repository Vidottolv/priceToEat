import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import FAB from '../../../components/Button/FAB.js';
import { ConsultaProduto } from '../../consultas/produto/index.js'
import { ConsultaBase } from '../../consultas/bases/index.js';
import { ConsultaReceita } from '../../consultas/receita/index.js';
import { useFonts } from 'expo-font';

export function Cadastros() {
  const navigation = useNavigation();
  const [isPressedReceita, setIsPressedReceita] = useState(true);
  const [isPressedBase, setIsPressedBase] = useState(false);
  const [isPressedProduto, setIsPressedProduto] = useState(false);
  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const handleReceitaSelect = () => {
    setIsPressedReceita(true);
    setIsPressedBase(false);
    setIsPressedProduto(false);
  };
  const handleBaseSelect = () => {
    setIsPressedReceita(false);
    setIsPressedBase(true);
    setIsPressedProduto(false);
  };
  const handleProdutoSelect = () => {
    setIsPressedReceita(false);
    setIsPressedBase(false);
    setIsPressedProduto(true);
  };

  return (
    <View style={styles.containerMain}>
      <Text style={[styles.title, styles.underline]}>PriceT'eat</Text>
        <View style={styles.containerBotoes}>
        <TouchableOpacity style={[styles.botoesCadastro, isPressedReceita 
          ? { backgroundColor:'#99BC85' } 
          : { borderWidth:2, backgroundColor:'#BFD8AF', borderColor:'#99BC85' }]} 
          onPress={handleReceitaSelect}>
              <Text style={[styles.textoBotoesCadastro, isPressedReceita 
                ? { fontFamily:'Quicksand-Bold', fontSize: 19, } 
                : { fontFamily:'Quicksand-Medium' }]}>
                Receitas
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botoesCadastro, isPressedBase 
            ? { backgroundColor:'#99BC85' } 
            : { borderWidth:2, backgroundColor:'#BFD8AF', borderColor:'#99BC85' }]}
            onPress={handleBaseSelect}>
              <Text style={[styles.textoBotoesCadastro, isPressedBase 
                ? { fontFamily:'Quicksand-Bold', fontSize: 19, } 
                : { fontFamily:'Quicksand-Medium' }]}>
                Bases
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ styles.botoesCadastro, isPressedProduto 
            ? { backgroundColor:'#99BC85' } 
            : { borderWidth:2, backgroundColor:'#BFD8AF', borderColor:'#99BC85' }]} 
            onPress={handleProdutoSelect}>
              <Text style={[ styles.textoBotoesCadastro, isPressedProduto 
                ? { fontFamily:'Quicksand-Bold', fontSize: 19 } 
                : { fontFamily:'Quicksand-Medium' }]}>
                Produtos
              </Text>
          </TouchableOpacity>
          </View>
          { isPressedProduto && 
            <Text style={styles.textoEdit}>* Clique nos produtos para editar.</Text> }
        <View style={ styles.containerDeProdutos }>  
          { isPressedProduto && <ConsultaProduto /> }
          { isPressedBase && <ConsultaBase /> }
          { isPressedReceita && <ConsultaReceita /> }
      </View>
        <FAB />
      </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    padding: 25,
    display:'flex',
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
  },
  containerBotoes: {
    height:'6%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%', 
    paddingHorizontal: 20,
    marginTop:'3%',
  },
  botoesCadastro:{
    width:'32%',
    borderRadius:8,
    height:30,
    justifyContent:'center'
  },
  textoBotoesCadastro: {
    fontSize: 16,
    fontWeight: 'normal',
    justifyContent:'center',
    textAlign:'center',
    fontFamily:'Quicksand-Regular'
  },
  containerDeProdutos: {
    marginHorizontal: 'auto',
    height:'100%'
  },
  title: {
    textAlign:'center',
    fontSize: 55,
    fontFamily: 'Quicksand-Bold',
    color: '#000',
    marginTop: '5%',
  },
  textoEdit:{
    fontSize: 16,
    color: '#000',
    alignSelf:'flex-start',
    marginLeft:'6%',
    fontFamily: 'Quicksand-Regular',
  },
  underline: {
    textDecorationLine: 'underline'
  },
})