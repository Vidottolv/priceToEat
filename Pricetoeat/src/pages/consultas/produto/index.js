import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import {onAuthStateChanged} from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

function ProdutoItem({ produto }) {

    const flashMessageSucesso = () => {
        showMessage({
          message: 'Item Excluído.',
          type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger',
          backgroundColor:'#8ff638'
        });
      };
    const flashMessageErro = () => {
      showMessage({
        message: 'Erro ao excluir item',
        type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
      });
    };
    
    const deletar = async() => {
        try{
            const produtoRef = doc(collection(firestore, 'produtos'), produto.id);
            await deleteDoc(produtoRef);
            console.log('excluído');
            flashMessageSucesso();
                } catch(error){
            console.error('erro ao excluir o produto', error);
            flashMessageErro();
        }
    }
    return (
      <TouchableOpacity 
        style={styles.buttonProduto}
        onLongPress={deletar}>
            <View style={styles.viewProduto}>
              <Text style={[styles.subtitle, styles.underline]}>{produto.Nome}</Text>
              <Text style={styles.textCompound}>Preço: R${produto.PrecoProd} </Text>
              <Text style={styles.textCompound}>Unidade: {produto.UnidadeMedida}</Text>
            </View>
      </TouchableOpacity>
    );
  }



export function ConsultaProduto(){
    const [produtos, setProdutos] = useState([]);
    const navigation = useNavigation();
  
     async function consultarProdutos() {
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                try {
                    const querySnapshot = await getDocs(collection(firestore, 'produtos'));
                    const produtosArray = [];
                    querySnapshot.forEach((doc) => {
                        const produto = {
                          id: doc.id,
                          ...doc.data(),
                        };
                        produtosArray.push(produto);
                      });
                      setProdutos(produtosArray);
                } catch (error) {
                    console.error('Erro ao consultar produtos:', error);
                  }
            }
        })
     }

     useEffect(() => {
        consultarProdutos();
     })

    return(
        <SafeAreaView style={styles.container}>
            <animatable.View  style={styles.content} animation={'fadeInRight'}>
                    <View style={styles.headerModal}>
                        <Text style={[styles.title,styles.underline]}>Consultar Produto</Text>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                                    <Ionicons
                                        size={30} 
                                        color={'#FFF'}
                                        name='home'/>
                            </TouchableOpacity>
                    </View>
                    <Text style={styles.observation}>
                    ⚠️ OBS: Segure apertado para excluir o produto.
                    </Text>
            <FlatList style={styles.flat}
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProdutoItem produto={item} />}/>
                </animatable.View>
        </SafeAreaView>
    )
}

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
        marginTop:'10%',
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
    }

})
