import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Modal} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { collection, getDocs} from "firebase/firestore"; 
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { ModalAdicionar } from '../../../components/modais/modalAdicionar';
import { useFonts } from 'expo-font';

function ProdutoItem({ produto }) {
    const navigation = useNavigation();
    const [adicionar, setAdicionar] = useState(false);
    const [openModalBase, setOpenModalBase] = useState(false);
    const handleModalAdicionar = () => {setAdicionar(true);}
    const handleOpenModalAdicionar = () => {setOpenModalBase(true);}
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }
    
    // const showFlashMessage = () => {
    //     showMessage({
    //       message: 'Item Excluído.',
    //       type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
    //     });
    //   };

    let unidade = '';
    if (produto.UnidadeMedida == '1') { unidade = 'kg'; }
    else if (produto.UnidadeMedida == '2') { unidade = 'grama'; }
    else if (produto.UnidadeMedida == '3') { unidade = 'litro'; }
    else if (produto.UnidadeMedida == '4') { unidade = 'ml'; }
    else { unidade = 'unidade'; }
    return (
      <TouchableOpacity 
        style={styles.buttonProduto}
        onPress={handleModalAdicionar}>
            <View style={styles.viewProduto}>
              <Text style={[styles.subtitle, styles.underline]}>{produto.Nome}</Text>
              <Text style={styles.textCompound}>R${produto.PrecoProd} por {unidade} </Text>
              <Text style={styles.textCompound}>ID: {produto.IDProduto}</Text>
            </View>
            <Modal 
                visible={adicionar}
                animationType='fade' 
                transparent={true}>
                <ModalAdicionar produto={produto} handleClose={() => setAdicionar(false)}/>
            </Modal> 
      </TouchableOpacity>
    );
  }

export function CadastroBase(){
    const [produtos, setProdutos] = useState([]);
    const navigation = useNavigation();
     async function consultarProdutos() {
        const user = auth.currentUser;
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
     }
     useEffect(() => {
        consultarProdutos();
    }, []);
        return(
        <SafeAreaView style={styles.container}>
            <animatable.View  style={styles.content} animation={'fadeInRightBig'}>
                    <View style={styles.headerModal}>
                        <Text style={[styles.title,styles.underline]}>Selecionar Produtos</Text>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                                    <Ionicons
                                        size={30} 
                                        color={'#99BC85'}
                                        name='home-outline'/>
                            </TouchableOpacity>
                    </View>
                    <Text style={styles.observation}>⚠️OBS: clique no ingrediente que você quer adicionar na base. (Clique no ✔️ no canto direito pra poder ver os produtos selecionados).</Text>
            <FlatList style={styles.flat}
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProdutoItem produto={item}/>}/>
                </animatable.View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width:'100%'
    },
    content:{
        flex:1,
        width:'100%',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Quicksand-Bold',
        color: '#99BC85',
        marginLeft: '3%',
        marginTop: '7%',
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 4,
            height: 2
        }
    },
    subtitle:{
        fontSize:20,
        fontFamily: 'Quicksand-Bold',
        color:'#000',
        marginTop:'2%',
    },
    textCompound:{
        fontSize:14,
        fontFamily: 'Quicksand-Regular',
        color:'#000',
    },
    backButton: {
        marginRight: '5%',
        marginTop: '8%'
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        // marginTop: '8%',
        borderBottomWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5',
        height: 130
    
    },
    underline: {
        textDecorationLine: 'underline'
    },
    textButton:{
        color:'#000',
        fontWeight:'bold'
    },
    buttonProduto:{
        borderWidth:3,
        borderColor:'#99BC85',
        borderRadius:30,
        marginBottom:'2%',
        width:'95%',
        alignSelf:'center',
        backgroundColor:'#D4E7C5'
    },
    viewProduto:{
        marginLeft:'8%',
        marginBottom:'2%'
    },
    flat:{
        height:'100',
        marginTop:'5%',
        padding:10
    },
    observation:{
        color:'#000',
        fontFamily: 'Quicksand-Regular',
        padding:5,
        paddingLeft:10
        // marginBottom:'5%'
    }

})
