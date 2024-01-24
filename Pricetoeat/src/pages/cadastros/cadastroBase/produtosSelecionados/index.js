import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../../controller';
import {onAuthStateChanged} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../../../components/context/produtoContext';

const ProdutosSelecionados = () => {
  const { globalArray, removeItemFromGlobalArray } = useGlobalContext();
  const navigation = useNavigation();
  const [nomeProduto, setNomeProduto] = useState('');
  const [nomeBase, setNomeBase] = useState('');


  const renderItem = ({ item }) => {
    let unidade = '';

    if ( item.UnidadeMedida == '1' ) { unidade = 'kilos'; }
    else if ( item.UnidadeMedida == '2' ) { unidade = 'gramas'; }
    else if ( item.UnidadeMedida == '3' ) { unidade = 'litros'; }
    else if ( item.UnidadeMedida == '4' ) { unidade = 'mililitros'; }
    else { unidade = 'unidade'; }

    return (
    <View>
      <TouchableOpacity 
        onLongPress={removeItemFromGlobalArray}>
          <Text style={styles.subtitle}>{item.Nome} - Em {unidade}</Text>
      </TouchableOpacity>
        <TextInput
            placeholder="Digite a Qtd usada."
            placeholderTextColor={'#F3F3FF'}
            value={nomeProduto}
            onChangeText={(value) => setNomeProduto(value)}
            style={styles.input}/>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerModal}>
          <Text style={[styles.title, styles.underline]}>Produtos Selecionados</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
          <Ionicons
              size={30} 
              color={'#FFF'}
              name='home'/>
          </TouchableOpacity>
        </View>
        <Text style={styles.observation}>Segure apertado o nome do produto para excluir ele da base.</Text>
        <Text style={styles.subtitle}> Nome da base:</Text>
        <TextInput
            value={nomeBase}
            onChangeText={(value) => setNomeBase(value)}
            style={styles.input}/>
        <FlatList
          data={globalArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
  
  export default ProdutosSelecionados;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E7A17A',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    content:{
        flex:1,
        width:'90%',
    },
    item:{
      borderColor:'#FFF',
      borderBottomWidth:1,  
      padding:5,
     },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#FFF',
        marginLeft:'1%',
    },
    subtitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#FFF',
    },
    textCompound:{
        fontSize:14,
        fontWeight:'bold',
        color:'#FFF',
        marginBottom:'1%'  
    },
    backButton:{
        marginRight:'5%',
    },
    headerModal:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        marginTop:'10%'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    textButton:{
        color:'#FFF',
        fontWeight:'bold'
    },
    buttonProduto:{
        borderWidth:1,
        borderRadius:30,
        marginBottom:'2%',
        borderColor:'#FFF',
        width:'95%'
    },
    viewProduto:{
        marginLeft:'8%',
        marginBottom:'2%'
    },
    flat:{
        marginTop:'5%'
    },
    observation:{
      color:'#FFF',
      marginBottom:'5%'
  },
  input:{
    color:'#F3F3FF',
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    fontSize:16,
    borderBottomColor:'#DADADA'
},

})
