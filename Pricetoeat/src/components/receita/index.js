import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../controller';
import { useGlobalContext } from '../context/produtoContext';
import { useFonts } from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown';
import { useReceitasData } from '../hooks/useReceitasData';
import { addDoc, collection, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export function NomearReceita({ route }) {
  const { produto, base } = route.params;
  const { AddToReceitaArray, removeItemFromReceitaArray, cleanReceitaArray } = useGlobalContext();
  const { data:receitasData } = useReceitasData();
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

  async function criaReceita() {
    if (nomeReceita != '') {
      try {
        const user = auth.currentUser;
        if(user) {
          const receitaRef = collection(firestore, 'receitas');
          const snapshot = await getDocs(receitaRef);
          const qtyReceitas = snapshot.size + 1;

          let custoReceita = 0;
          listaCustos = [];
            
            if(base) {
              listaCustos.push(...base.ProdutosBase);
              console.log(listaCustos)
            }
            for (let i = 0; i < listaCustos.length; i++) {
              if (listaCustos[i].custo == 0) {
                listaCustos[i].custo = listaCustos[i].quantidade * listaCustos[i].Preco;
              }
              custoReceita += listaCustos[i].custo;
            }
            if(produto) {
              const TratarProduto = {
                custo: 0,
                preco: parseInt(produto.Preco,10),
                produto: produto.Nome,
                quantidade: 0,
                tamanhoEmbalagem: parseInt(produto.TamanhoEmbalagem,10),
                unidadeDeMedida: parseInt(produto.UnidadeDeMedida,10),
              }
              listaCustos.push(TratarProduto); 
            }
            const novaReceita = {
              nomeReceita: nomeReceita,
              IDReceita: qtyReceitas,
              IDUsuario: user.uid,
              custoReceita: custoReceita,
              lucroPercent:0,
              ProdutosReceita: listaCustos
            };
            await addDoc(receitaRef, novaReceita); 
            navigation.navigate('home')
            // if(produto) {
            //   const nomeproduto = produto.Nome;
            //   const tamanhoProduto = produto.tamanhoEmbalagem;
            //   const precoproduto = produto.preco;
            //   const unidadeproduto = produto.unidadeDeMedida;
            //   console.log(nomeReceita, produto)
            //   navigation.navigate('QtyProdutos', { receita: nomeReceita, nome: nomeproduto, tamanho: tamanhoProduto, custoprod: precoproduto, unidadeprod: unidadeproduto,idReceita: qtyReceitas });
            // }
            // else{
            //   setTimeout( () => navigation.navigate('home'), duration = 1000)   
            // }
          }            
      } catch (error) {
        console.error('erro', error);
      }
    }
  }

  async function atualizaReceita(idReceita) { 
    try{
      console.log(idReceita)
      const receitaDocument = doc(firestore,'receitas', idReceita)
      const receitaSnap = await getDoc(receitaDocument);
      const receitaData = receitaSnap.data();
      listaCustos = [...(receitaData.ProdutosReceita || [])];
      custoReceita = receitaData.custoReceita;

      if(produto) {
        const TratarProduto = {
          produto: produto.Nome,
          preco: parseInt(produto.Preco,10),
          custo: 0,
          quantidade: 0,
          tamanhoEmbalagem: parseInt(produto.TamanhoEmbalagem,10),
          unidadeDeMedida: parseInt(produto.UnidadeDeMedida,10),
          // IDProduto: produto.IDProduto
        }
        listaCustos.push(TratarProduto); 
      }
      if(base) {
        listaCustos.push(...base.ProdutosBase);
      }
      custoReceita = listaCustos.reduce((total, produto) => {
        return total + (produto.custo * produto.quantidade);
      }, 0);

      await updateDoc(receitaDocument,{
        ProdutosReceita: listaCustos,
        custoReceita: custoReceita
      });
      console.log("Receita atualizada com sucesso!");  
    }
    catch(error) {
      console.error("Erro ao atualizar receita: ", error);
    }
  }

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
            criaReceita()
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
          placeholder={"Já existente"}
          value={value}
          onChange={(item) => {
            setValue(item.value);
            atualizaReceita(item.value);
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
    color: '#000',
    fontSize: 16,
    fontFamily:'Quicksand-Bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '35%',
    marginTop: 10,
    marginBottom: 6,
    padding: 4,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#99BC85',
    backgroundColor: '#D4E7C5'
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
    color:'#000',
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
