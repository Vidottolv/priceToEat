import { React, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal}from 'react-native';
import { ModalCadastroIngrediente } from '../../../components/modais/modalCadstIngrediente';
import { ModalCadastroReceita } from '../../../components/modais/modalCadstReceita';

export function Cadastros(){
  const [modalIngVisible, setModalIngVisible] = useState(false);
  const [modalRecVisible, setModalRecVisible] = useState(false);


  const handleOpenModalIng = () => {
    setModalIngVisible(true);
  }
  const handleOpenModalRec = () => {
    setModalRecVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerRecipes}>
        <Text style={[styles.title, styles.underline]}>Cadastrar Produtos</Text>
          <Text style={styles.textCompound}>
            Aqui, você cadastrará os produtos a serem usados nas suas receitas.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleOpenModalIng}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.containerRecipes}>
        <Text style={[styles.title, styles.underline]}>Cadastrar Receitas</Text>
          <Text style={styles.textCompound}>
            Aqui, você poderá cadastrar todas as receitas de seu restaurante.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleOpenModalRec}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
    <Modal 
      visible={modalIngVisible}
      animationType='fade' 
      transparent={true}
      onRequestClose={() => setModalIngVisible(false)}>
        <ModalCadastroIngrediente 
          handleClose={() => setModalIngVisible(false)}/>
    </Modal>
    <Modal 
      visible={modalRecVisible} 
      animationType='fade' 
      transparent={true}>
        <ModalCadastroReceita 
          handleClose={() => setModalRecVisible(false)}/>
    </Modal>
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
    borderColor:'#FFF'
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
    marginTop:40,
    marginBottom:6,
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