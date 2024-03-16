import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
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
            const baseRef = doc(collection(firestore, 'bases'), base.id);
            await deleteDoc(baseRef);
            console.log('excluído');
            flashMessageSucesso();
        } catch (error) {
            console.error('erro ao excluir o produto', error);
            flashMessageErro();
        }
    }
    return (
        <TouchableOpacity
            style={styles.buttonBase}
            onPress={() => onPressItem(base)}>
            <View style={styles.viewProduto}>
                <View style={styles.image}>
                    {/* <Image source={require('../../assets/priceteatFundoRem.png')}/> */}
                </View>
                <View style={styles.textos}>
                    <Text style={[styles.subtitle, styles.underline]}>{base.Nome}</Text>
                    <View style={styles.subContainerComponent}>
                        <View>
                            <Text style={styles.textCompound}>Custo da Base: R${base.custoBase}</Text>
                            <Text style={styles.textCompound}>{base.listaCustos[0].produto} - Custo: R${base.listaCustos[0].custo}</Text>
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
        try {
            const user = await new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject(new Error("Usuário não autenticado"));
                    }
                });
            });
    
            const basesSnapshot = await getDocs(collection(firestore, 'bases'));
            const basesArray = [];
            basesSnapshot.forEach((doc) => {
                const base = {
                    id: doc.id,
                    ...doc.data(),
                };
                basesArray.push(base);
            });
            setBases(basesArray);
            setIsLoading(false);
        } catch (error) {
            console.error('Erro ao consultar bases:', error);
        }
    }
        useEffect(() => {
        consultarBases(),
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
                        {/* Use o componente ModalMostraBase com a letra maiúscula correta */}
                        <ModalMostraBase modalVisible={openModal} base={baseId} handleClose={() => setOpenModal(false)} />
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
        // borderWidth:1
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
        fontSize: 24,
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
    textVerMais: {
        fontSize:12,
        fontFamily: 'Quicksand-Bold',
        color:'#000',
        marginBottom:'1%',
        marginTop:'1%',
        marginLeft:'4%',
        textAlign:'left'
    },
    favButton: {
        alignSelf: 'center'
    },
    image: {
        backgroundColor: '#99BC85',
        height: 120,
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
    buttonBase: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: '2%',
        // marginLeft: '5%',
        // marginRight: '5%',
        borderColor: '#99BC85',
        // height:140,
        width:'100%',
        backgroundColor:'#E1F0DA'
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
        marginTop: '5%',
    },
    observation: {
        color: '#000',
        marginBottom: '5%'
    }

})
