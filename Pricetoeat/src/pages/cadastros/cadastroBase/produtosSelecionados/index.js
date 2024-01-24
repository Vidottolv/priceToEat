import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Modal} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../../controller';
import {onAuthStateChanged} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../../../components/context/produtoContext';

const ProdutosSelecionados = () => {
    const navigation = useNavigation();
    const { globalArray } = useGlobalContext();  // Obtenha o array de produtos do contexto
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={[styles.title, styles.underline]}>Produtos Selecionados</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Produtos')}>
              <Ionicons size={30} color={'#FFF'} name='arrow-back-circle' />
            </TouchableOpacity>
          </View>
  
          {/* Exibindo a lista de produtos selecionados */}
          <View>
          {globalArray.map((produto, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{produto.Nome}</Text>
            </View>
          ))}
        </View>
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
        marginTop:'2%',
        marginBottom:'2%'  
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
    }

})
