import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import {onAuthStateChanged} from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { hideMessage, showMessage } from 'react-native-flash-message';

function ProdutoItem({ produto }) {

    // const showFlashMessage = () => {
    //     showMessage({
    //       message: 'Item Excluído.',
    //       type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
    //     });
    //   };
    
    const deletar = async() => {
        try{
            const produtoRef = doc(collection(firestore, 'produtos'), produto.id);
            await deleteDoc(produtoRef);
            console.log('excluído');
            // showFlashMessage();
        } catch(error){
            console.error('erro ao excluir o produto', error);
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



export function ModalConsultaProduto({ handleClose }){
    const [produtos, setProdutos] = useState([]);
  
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
            <TouchableOpacity style={{flex:1, zIndex:9}}></TouchableOpacity>
            <animatable.View animation={'fadeInUpBig'} style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title,styles.underline]}>Lista de Produtos:</Text>
                        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
                                <Ionicons
                                    size={30} 
                                    color={'#FFF'}
                                    name='close-circle-outline'/>
                        </TouchableOpacity>
                </View>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProdutoItem produto={item} />}/>
            </animatable.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(24,24,24,0.6)',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    content:{
        backgroundColor:'#E06F72',
        height:'85%',
        width:'100%',
        borderRadius:24,
        paddingStart:'5%',
        paddingEnd:'5%',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#FFF',
        marginLeft:'1%',
        marginTop:'3%'
    },
    subtitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#F3F3FF',
        marginTop:'2%',
        marginBottom:'2%'  
    },
    textCompound:{
        fontSize:14,
        fontWeight:'bold',
        color:'#F3F3FF',
        marginBottom:'1%'  
    },
    input:{
        color:'#F3F3FF',
        borderBottomWidth:1,
        height:40,
        fontSize:14,
        borderBottomColor:'#DADADA'
    },
    backButton:{
        marginTop:'3%',
        marginRight:'1%',
    },
    headerModal:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    underline: {
        textDecorationLine: 'underline'
    },
    radio:{
        borderColor:'#FFF',
        marginTop:1,
    },
    textRadio:{
        color:'#FFF', 
        fontWeight:'bold'
    },
    rodape:{
        fontSize: 10,
        color:'#FFF',
        marginBottom:10
    },
    buttonCadastrar:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        marginTop:30,
        marginBottom:6,
        padding:4,
        borderRadius:40,
        margin: '5%',
        borderWidth: 1,
        borderColor:'#FFF'
    },
    textButton:{
        color:'#F3F3FF',
        fontWeight:'bold'
    },
    buttonProduto:{
        borderWidth:1,
        borderRadius:30,
        marginBottom:'1%',
        borderColor:'#FFF'
    },
    viewProduto:{
        marginLeft:'8%',
        marginBottom:'1%'
    }

})
