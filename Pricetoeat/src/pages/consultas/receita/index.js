import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { collection, getDocs, doc, deleteDoc, query, where} from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
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
        });
    };
    const deletar = async () => {
        try {
            const receitaRef = doc(collection(firestore, 'receitas'), receita.id);
            await deleteDoc(receitaRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir a receita', error);
            flashMessageErro();
        }
    }
    const verificarValoresNulos = () => {
        for (const produto of receita.ProdutosReceita) {
            if (produto.quantidade == 0 || produto.custo == 0) {
                return true;
            }
        }
        return false;
    };
    const showFlashMsg = () => {
        setTimeout(() => {
            showMessage({
                message: 'Existem valores nulos, atualize-os!',
                type: 'warning',
            });
        }, 2000);
    };
    const handlePressItem = () => {
        if (verificarValoresNulos()) {
            onPressItem(receita);
            showFlashMsg();
        } else {
            onPressItem(receita);
        }
    };

    return (
        <TouchableOpacity
            style={styles.buttonBase}
            onPress={handlePressItem}>
            <View style={styles.viewProduto}>
                <View style={styles.image}>
                    {/* <Image source={require('../../assets/priceteatFundoRem.png')}/> */}
                </View>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{receita?.nomeReceita}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>Custo da Receita: R${receita?.custoReceita}</Text>
                            <Text style={styles.textCompound}>{receita?.ProdutosReceita[0].Nome} - Custo: R${receita?.ProdutosReceita[0].custo}</Text>
                            <Text style={styles.textVerMais}>Clique para ver a base completa.</Text>
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
    const handleOpenModal = (receita) => {
        setReceitaId(receita);
        setOpenModal(true);
    };
    
    async function consultarReceitas() {
        try {
            const user = auth.currentUser;
            const receitasSnapshot = await getDocs(query(collection(firestore, 'receitas'), where('IDUsuario', '==', user.uid)));
            const receitasArray = [];
            receitasSnapshot.forEach((doc) => {
                const receita = {
                    id: doc.id,
                    ...doc.data(),
                };
                receitasArray.push(receita);
            });
            setReceitas(receitasArray);
            setIsLoading(false);
        } catch (error) {
            console.error('Erro ao consultar receitas:', error);
        }
    }
        useEffect(() => {
        consultarReceitas();
    },[])

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                    <View style={styles.content}>
                        <LottieView
                            source={require('../../../assets/waitingAnimation.json')}
                            autoPlay
                            loop />
                    </View>
                    ) : (
                        <animatable.View animation={'fadeInRight'}>
                            <FlatList style={styles.flat}
                            data={receitas}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ReceitaItem
                                receita={item}
                                onPressItem={handleOpenModal}
                                />
                            )}
                            />
                        <ModalMostraReceita modalVisible={openModal} receita={receitaId} handleClose={() => setOpenModal(false)} />
                    </animatable.View>
                    )
            }
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
        alignItems: 'center'
    },
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
        height: 120,
        width: '30%',
        borderRadius: 10,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
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
