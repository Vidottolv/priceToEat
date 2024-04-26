import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { collection, doc, deleteDoc, query, where,onSnapshot } from "firebase/firestore";
import { hideMessage, showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { ModalMostraBase } from '../../../components/modais/modalMostraBase';

function BaseItem({ base, onPressItem }) {
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
            const baseRef = doc(collection(firestore, 'bases'), base.id);
            await deleteDoc(baseRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir a base', error);
            flashMessageErro();
        }}     
    return (
        <TouchableOpacity
            style={styles.buttonBase}
            onLongPress={deletar}
            onPress={() => onPressItem(base)}>
            <View style={styles.viewProduto}>
                <View style={styles.image}>
                    <Image 
                        source={base?.Blob ? { uri: base?.Blob } : require('../../assets/priceteatFundoRem.png')} 
                        style={styles.selectedImage} 
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{base.NomeBase}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>Custo da Base: R${base.custoBase}</Text>
                            <Text style={styles.textCompound}>{base.ProdutosBase[0].produto} - Custo: R${base.ProdutosBase[0].custo.toFixed(2)}</Text>
                            <Text style={styles.textVerMais}>Clique para ver a base completa.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function ConsultaBase() {
    const [bases, setBases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const [baseId, setBaseId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (base) => {
        setBaseId(base);
        setOpenModal(true);
    };
    
    async function consultarBases() {
        const user = auth.currentUser;
        if (user) {
            try {
                console.log('eai')
                const q = query(collection(firestore, 'bases'), where('IDUsuario', '==', user.uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const basesArray = [];
                    querySnapshot.forEach((doc) => {
                        const base = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        basesArray.push(base);
                    });
                    setBases(basesArray);
                    setIsLoading(false);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Erro ao consultar Bases:', error);
                setIsLoading(false);
            }
        }
    } 
    useEffect(() => {
        consultarBases();
    },[])

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
                            data={bases}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <BaseItem
                                base={item}
                                onPressItem={handleOpenModal}
                                />
                            )}
                            />
                        <ModalMostraBase 
                            modalVisible={openModal} 
                            base={baseId} 
                            handleClose={() => setOpenModal(false)}/>
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
        height: '100%',
        width: '30%',
        borderRadius: 10,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
        justifyContent:'center'
    },
    selectedImage:{
        width:92,
        height:92,
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
