import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../controller';
import { useGlobalContext } from '../context/produtoContext';
import { useFonts } from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown';
import { useReceitasData } from '../hooks/useReceitasData';

export function NomearReceita({ route }) {
  const { produto, base } = route.params;
  const { AddToReceitaArray } = useGlobalContext(); 
  const { removeItemFromReceitaArray } = useGlobalContext();
  const { cadastrarReceita, atualizarReceita, data: receitasData } = useReceitasData();
  const [nomeReceita, setNomeReceita] = useState('');
  const [value, setValue] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('Já existente');
  const [data, setData] = useState(receitasData);

  const navigation = useNavigation();
  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Var': require('../../assets/fonts/Quicksand-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    setData(receitasData);
  }, [receitasData]);

  if (!loaded) { return null; }

  const handleReceitaChange = async (idReceita) => {
    try {
      if (idReceita) {
        const receitaSelecionada = receitasData.find(receita => receita.value === idReceita);
        if (receitaSelecionada) {
          let detalhesAtualizados = receitaSelecionada.detalhes || ''; 
          if (produto) {
            detalhesAtualizados += {produto}; 
          }
          if (base) {
            detalhesAtualizados += {base};
          }
          const novaReceita = {
            ...receitaSelecionada,
            Detalhes: detalhesAtualizados
          };
          await atualizarReceita(idReceita, novaReceita);
          setData(prevData => prevData.map(item => item.id === idReceita ? novaReceita : item));
        }
      } else {
        console.error('Nenhuma receita selecionada.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('erro', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, styles.underline]}>Editar Produto</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons
            size={30}
            color={'#99BC85'}
            name='home'/>
        </TouchableOpacity>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity 
          onPress={() => {
            cadastrarReceita(nomeReceita);
            navigation.goBack();
          }}
          style={styles.button}>
          <Text style={styles.textButton}>Nova Receita</Text>
        </TouchableOpacity>  
        <Dropdown
          style={[styles.button]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholderText}
          value={value}
          onChange={item => {
            setValue(item.value);
            setPlaceholderText(item.label);
            handleReceitaChange(item.value);
          }}
        />
      </View>
      <TextInput
        placeholder="Nome da Receita"
        placeholderTextColor="#000"
        value={nomeReceita}
        onChangeText={setNomeReceita}
        style={styles.textinput}/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    color: '#99BC85',
    marginLeft: '3%',
    textShadowRadius: 4,
    textShadowColor: '#BFD8AF',
    textShadowOffset: {
      width: 4,
      height: 2
    }
  },
  backButton: {
    marginTop: '3%',
    marginRight: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: '5%', 
    height: '15%',  
    borderColor: '#99BC85',
    borderWidth:2,
    backgroundColor: '#D4E7C5',
    paddingHorizontal: '5%', 
  },
  botoes:{
    flexDirection:'row',
    columnGap:5,
    marginTop:'15%'
  },
  textButton: {
    color: '#FFF',
    fontSize: 16,
    fontFamily:'Quicksand-Bold',
  },
  button: {
    marginTop:20,
    borderWidth: 2,
    borderRadius: 25,
    height: 40,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#000'
  },
  textinput:{
    color:'#515151',
    borderBottomWidth:1,
    width:'70%',
    fontSize:15,
    fontFamily:'Quicksand-Bold',
    marginTop:"10%"
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#FFF',
    fontFamily:'Quicksand-Bold',
    textAlign:'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'#FFF',
    fontFamily:'Quicksand-Bold',
    textAlign:'center'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
