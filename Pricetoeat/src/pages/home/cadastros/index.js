import { React, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity}from 'react-native';


export function Cadastros(){
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerRecipes}>
        <Text style={[styles.title, styles.underline]}>Cadastrar Produtos</Text>
          <Text style={styles.textCompound}>
            Aqui, você cadastrará os produtos a serem usados nas suas receitas.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('cadastroProduto')}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.containerRecipes}>
        <Text style={[styles.title, styles.underline]}>Cadastrar Bases</Text>
          <Text style={styles.textCompound}>
            Cadastre bases de receitas, como massas de bolo, molhos elaborados, etc.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('cadastroBase')}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.containerRecipes}>
        <Text style={[styles.title, styles.underline]}>Cadastrar Receitas</Text>
          <Text style={styles.textCompound}>
            Nesta aba, você poderá cadastrar todas as receitas usadas no seu restaurante.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('cadastroReceita')}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#E7A17A",
    justifyContent:'center',
    alignItems:'center',
  },
  containerRecipes:{
    height:'30%',
    width:'85%',
    borderWidth:1,
    borderRadius:16,
    margin:4,
    borderColor:'#FFF',
    padding:11
  },
  title:{
    fontSize:24,
    color:'#FFF',
    marginLeft:'4%',
    marginTop:'3%'
  },
  textCompound:{
    fontSize:18,
    color:'#FFF',
    marginLeft:'8%',
    marginTop:'2%',
    marginRight:'2%'
  },
  button:{
    height:50,
    alignItems: 'center',
    padding:12,
    borderRadius:40,
    backgroundColor:"#E19063",
    margin: '10%',
    borderWidth: 1,
    borderColor:'#FFF'
  },
  buttonText:{
    color:"#FFF",
    fontSize:16,
  },
  underline: {
   textDecorationLine: 'underline'
  },
})