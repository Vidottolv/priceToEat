import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { firestore, auth } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

export default function LucroReceita({ route, navigation }) {
    const { receita } = route.params;
    const [lucroPercent, setLucroPercent] = useState(receita.lucroPercent);
    
    const handleSalvar = async () => {
      const usuario = auth.currentUser;
      if (usuario) {
        const receitaRef = doc(firestore, 'receitas', receita.id);
        const docData = {
          lucroPercent: parseInt(lucroPercent)
        };
        try {
          await updateDoc(receitaRef, docData);
          console.log('Lucro percentual da receita atualizado com sucesso!');
          navigation.navigate('home');
        } catch (error) {
          console.error('Erro ao atualizar o lucro percentual:', error);
        }
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.headerModal}>
          <Text style={[styles.title, styles.underline]}>Lucro da Receita</Text>
          <TouchableOpacity 
            style={styles.icon}
            onPress={() => navigation.navigate('home')}>
            <Ionicons 
              size={35} 
              color={'#99BC85'} 
              name='home-outline'/>
          </TouchableOpacity>
        </View>
        <View style={styles.lucroContainer}>
          <Text style={styles.label}>Lucro em %:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Lucro Percentual"
            value={lucroPercent ? lucroPercent.toString() : ''}
            onChangeText={text => setLucroPercent(text)}
          />
        </View>
        <TouchableOpacity style={styles.buttonSalvar} onPress={handleSalvar}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    width:'100%'
  },
  icon:{
    marginTop:'15%',
    marginRight:'5%'
  },
  headerModal:{
    flexDirection:'row',
    backgroundColor: '#D4E7C5',
    width:'100%',
    height:130,
    marginBottom:'5%',
    borderBottomWidth:3,
    borderColor:'#99BC85',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    color: '#99BC85',
    marginLeft: '3%',
    marginTop: '13%',
    textShadowRadius: 4,
    textShadowColor: '#BFD8AF',
    textShadowOffset: {
      width: 4,
      height: 2
    }
  },
  underline: {
    textDecorationLine: 'underline'
  },
  lucroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  produtoText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: '#000'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#E1F0DA',
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    fontSize: 14,
    borderColor: '#99BC85',
    fontFamily: 'Quicksand-Bold',
  },
  buttonSalvar: {
    width:'60%',
    marginTop: 20,
    padding: 10,
    borderRadius: 30,
    height:50,
    backgroundColor: '#000',
    fontFamily: 'Quicksand-Regular',
  },
  buttonVoltar: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#99BC85'
  },
  textButton: {
    fontSize: 18,
    fontFamily: 'Quicksand-Regular',
    color: '#E1F0DA',
    textAlign: 'center'
  },
  label: {
    fontFamily: 'Quicksand-Bold',
  }
});
