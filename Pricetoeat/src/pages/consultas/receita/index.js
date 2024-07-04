import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image,RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { collection, doc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { ModalMostraReceita } from '../../../components/modais/modalMostraReceita';

function ReceitaItem({ receita, onPressItem }) {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const flashMessageSucesso = () => {
        showMessage({
            message: 'Item Excluído.',
            type: 'info',
            backgroundColor: '#0bbd29'
        });
    };
    const flashMessageErro = () => {
        showMessage({
            message: 'Erro ao excluir item',
            type: 'info',
            backgroundColor: '#E06F72'
        });
    };
    const deletar = async () => {
        try {
            const receitaRef = doc(collection(firestore, 'receitas'), receita.id);
            await deleteDoc(receitaRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir a base', error);
            flashMessageErro();
        }} 
    const mensagem = () => {
        if(receita.custoReceita == 0) {
            return ( <Text style={styles.textVerMais}>Há produtos sem Qtd. Clique para cadastrar.</Text> )
        }
        if(receita.lucroPercent == 0) {
            return ( <Text style={styles.textVerMais}>Clique para cadastrar o Lucro.</Text> );
        }
        else {
            return( <Text style={styles.textVerMais}>Clique para ver a receita completa.</Text> );    
        }
    }
    const handlePressItem = () => {
        onPressItem(receita);
    };
    let lucro = 1 + (receita?.lucroPercent / 100);
    let preco = receita?.custoReceita * lucro; 

    return (
        <TouchableOpacity
            style={styles.buttonBase}
            onLongPress={deletar}
            onPress={handlePressItem}>
            <View style={styles.viewProduto}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('imagemReceita', {receitaId: receita.id})}
                    style={styles.image}>
                    <Image 
                        source={receita?.Blob ? { uri: receita?.Blob } : require('../../assets/priceteatFundoRem.png')} 
                        style={styles.selectedImage}/>
                </TouchableOpacity>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{receita?.nomeReceita}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>Custo: R${receita?.custoReceita}</Text>
                            <Text style={styles.textCompound}>Preço de Venda: R${preco.toFixed(2)}</Text>
                            <Text style={styles.textCompound}>Percentual de Lucro: {receita?.lucroPercent}%</Text>
                            {mensagem()}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function ConsultaReceita() {
    const [receitas, setReceitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const [receitaId, setReceitaId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const handleOpenModal = (receita) => {
        setReceitaId(receita);
        setOpenModal(true);
    };
    
    async function consultarReceitas() {
        const user = auth.currentUser;
        if (user) {
            try {
                console.log('alo')
                const q = query(collection(firestore, 'receitas'), where('IDUsuario', '==', user.uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const receitasArray = [];
                    querySnapshot.forEach((doc) => {
                        const receita = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        receitasArray.push(receita);
                    });
                    setReceitas(receitasArray);
                    setIsLoading(false);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Erro ao consultar produtos:', error);
                setIsLoading(false);
            }
        }
    }
    useEffect(() => {
        consultarReceitas();
    },[])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        consultarReceitas().then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (navigation.isFocused()) {
                onRefresh();
            }
        }, [navigation])
    );

    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //       setRefreshing(false);
    //     }, 2000);
    //   }, []);

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
                        data={receitas}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                            <ReceitaItem
                            receita={item}
                            onPressItem={handleOpenModal}
                            />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        />
                        <ModalMostraReceita modalVisible={openModal} receita={receitaId} handleClose={() => setOpenModal(false)} />
                    </animatable.View>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width:'100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // lottieView: {
    //     flex:1,
    //     justifyContent:'center',
    //     alignContent:'center',
    //     alignSelf:'center',
    //     alignItems:'center'
    //   },
    subContainerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    textVerMais: {
        fontSize:12,
        fontFamily: 'Quicksand-Bold',
        color:'#000',
        marginBottom:'1%',
        marginTop:'1%',
        marginLeft:'4%',
        textAlign:'left'
    },
    image: {
        backgroundColor: '#99BC85',
        height: '100%',
        width: '30%',
        borderRadius: 10,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
        justifyContent:'center'
    },
    selectedImage:{
        marginLeft:'5%',
        width:100,
        height:100,
        borderRadius:72,
        borderColor:'#BFD8AF'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    buttonBase: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: '2%',
        borderColor: '#99BC85',
        width:'100%',
        backgroundColor:'#E1F0DA'
    },
    viewProduto: {
        flexDirection: 'row',
    },
    flat: {
        marginTop: '5%',
    },
})
