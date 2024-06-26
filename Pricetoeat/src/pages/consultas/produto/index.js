import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { collection, doc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

function ProdutoItem({ produto, setNavigateToNomearReceita, press }) {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) { return null; }
    const flashMessageSucesso = () => {
        showMessage({
            message: 'Item Excluído.',
            type: 'info',
            backgroundColor: '#0bbd29'
        });
    };
    const flashMessageErro = () => {
        showMessage({
            message: 'Erro ao excluir item.',
            type: 'info',
        });
    };
    const deletar = async () => {
        try {
            const produtoRef = doc(collection(firestore, 'produtos'), produto.id);
            await deleteDoc(produtoRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir o produto', error);
            flashMessageErro();
        }}         
    let unidade = '';
    let custo = 0;
    if (produto?.UnidadeDeMedida == '1') { unidade = 'kilo'; custo = produto?.Preco; }
    else if (produto?.UnidadeDeMedida == '2') { unidade = 'grama'; custo = produto?.Preco / produto?.TamanhoEmbalagem }
    else if (produto?.UnidadeDeMedida == '3') { unidade = 'litro';  custo = produto?.Preco / produto?.TamanhoEmbalagem }
    else if (produto?.UnidadeDeMedida == '4') { unidade = 'ml';  custo = produto?.Preco / produto?.TamanhoEmbalagem }
    else { unidade = 'unid'; custo = produto?.Preco / produto?.TamanhoEmbalagem;}
    return (
        <TouchableOpacity
            style={styles.buttonProduto}
            onLongPress={deletar}
            onPress={() => press(produto)}
            >
            <View style={styles.viewProduto}>
                <View style={styles.image}>
                    <Image 
                        source={produto?.Blob ? { uri: produto?.Blob } : require('../../assets/priceteatFundoRem.png')} 
                        style={styles.selectedImage} 
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{produto?.Nome}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>R${custo.toFixed(2)} por {unidade}</Text>
                            <Text style={styles.textCompound}>ID: {produto?.IDProduto}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setNavigateToNomearReceita(produto)}
                                style={styles.favButton}>
                                <Ionicons size={35} color={'#99BC85'} name='add-circle-outline' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export function ConsultaProduto() {
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [navigateToNomearReceita, setNavigateToNomearReceita] = useState(false);
    const navigation = useNavigation();
  
    const handleEdit = (produto) => {
        navigation.navigate('editaProduto', { produto });
    };

    async function consultarProdutos() {
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(firestore, 'produtos'), where('IDUsuario', '==', user.uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const produtosArray = [];
                    querySnapshot.forEach((doc) => {
                        const produto = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        produtosArray.push(produto);
                    });
                    setProdutos(produtosArray);
                    setIsLoading(false);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Erro ao consultar produtos:', error);
                setIsLoading(false);
            }
        }
    } 
        
    const deletarProduto = async (produtoId) => {
        try {
            const produtoRef = doc(collection(firestore, 'produtos'), produtoId);
            await deleteDoc(produtoRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir o produto', error);
            flashMessageErro();
        }
    };

    useEffect(() => {
        if (navigateToNomearReceita) {
            navigation.navigate("nomearReceita", 
            { produto: navigateToNomearReceita });
            setNavigateToNomearReceita(false); 
        }
    }, [navigateToNomearReceita]);
    useEffect(() => {
            consultarProdutos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                    <View style={{marginTop:'15%'}}>
                    <LottieView
                        source={require('../../../assets/waitingAnimation.json')}
                        autoPlay={true}
                        loop={true}
                        style={{ width: 200, height: 200 }}
                        />
                </View>
                ) : (
                <animatable.View animation={'fadeInRight'}>
                    <FlatList style={styles.flat}
                        data={produtos}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) =>
                            <ProdutoItem
                                produto={item}
                                press={handleEdit}
                                setNavigateToNomearReceita={setNavigateToNomearReceita}
                                deletarProduto={deletarProduto} />}
                        scrollEnabled />
                </animatable.View>
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height:'100%'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Quicksand-Bold',
        color: '#000',
        marginLeft: '1%',
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        color: '#000',
    },
    textos: {
        width: '63%',
        marginLeft: '7%'
    },
    textCompound: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        color: '#000',
        marginBottom: '1%',
        marginLeft: '5%',
        textAlign: 'left'
    },
    favButton: {
        alignSelf: 'center',
        marginRight:5,
    },
    image: {
        backgroundColor: '#99BC85',
        height: 84,
        width: '30%',
        borderRadius: 10,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
        justifyContent:'center'
    },
    selectedImage:{
        width:80,
        height:80,
        borderRadius:72,
        borderColor:'#BFD8AF'
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: '10%',
    },
    underline: {
        textDecorationLine: 'underline'
    },
    textButton: {
        color: '#000',
        fontFamily: 'Quicksand-Bold',
    },
    buttonProduto: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: '2%',
        marginLeft: '5%',
        marginRight: '5%',
        borderColor: '#99BC85',
    },
    viewProduto: {
        flexDirection: 'row',
    },
    flat: {
        marginTop: '5%',
        height:'100%'
    },
    observation: {
        color: '#000',
        marginBottom: '5%'
    }

})
