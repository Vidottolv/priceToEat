import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect, useSyncExternalStore } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

function ProdutoItem({ produto }) {
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
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger',
            backgroundColor: '#0bbd29'
        });
    };
    const flashMessageErro = () => {
        showMessage({
            message: 'Erro ao excluir item',
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
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
    if (produto.UnidadeMedida == '1') { unidade = 'kilo'; }
    else if (produto.UnidadeMedida == '2') { unidade = 'grama'; }
    else if (produto.UnidadeMedida == '3') { unidade = 'litro'; }
    else if (produto.UnidadeMedida == '4') { unidade = 'ml'; }
    else { unidade = 'unid'; }
    return (
        <TouchableOpacity
            style={styles.buttonProduto}
            onLongPress={deletar}>
            <View style={styles.viewProduto}>
                <View style={styles.image}>
                    <Image source={require('../../assets/priceteatFundoRem.png')} />
                </View>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{produto.Nome}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>R${produto.PrecoProd} por {unidade}</Text>
                            <Text style={styles.textCompound}>ID: {produto.IDProduto}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('criaReceita')}
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
    const navigation = useNavigation();

    async function consultarProdutos() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const produtosSnapshot = await getDocs(collection(firestore, 'produtos'));
                    const produtosArray = [];
                    produtosSnapshot.forEach((doc) => {
                        const produto = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        produtosArray.push(produto);
                    });
                    setProdutos(produtosArray);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Erro ao consultar produtos:', error);
                }
            }
        })
    }
    useEffect(() => {
        consultarProdutos(),
            [];
    })

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.content}>
                    <LottieView
                        source={require('../../../assets/waitingAnimation.json')}
                        autoPlay
                        loop />
                </View>) : (
                <animatable.View animation={'fadeInRight'}>
                    <FlatList style={styles.flat}
                        data={produtos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProdutoItem produto={item} />} />
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
        // marginRight:'15%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ////borderWidth:2
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
        // marginTop: '2%',
        // marginBottom: '2%'
    },
    textos: {
        // flex:1
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
        height: 80,
        width: '30%',
        borderRadius: 10,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
        ////borderWidth:2
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
        //borderWidth:2,
        flexDirection: 'row',
        // marginLeft: '8%',
        // marginRight:'30%',
        // marginBottom: '2%',
        // marginTop:'2%'
    },
    flat: {
        marginTop: '5%'
    },
    observation: {
        color: '#000',
        marginBottom: '5%'
    }

})
