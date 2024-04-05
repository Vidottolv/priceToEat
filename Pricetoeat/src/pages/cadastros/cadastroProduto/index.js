import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import * as animatable from 'react-native-animatable'
import { RadioButtonItem, RadioButtonGroup } from 'expo-radio-button';
import NumericInput from 'react-native-numeric-input'
import { firestore, auth } from '../../../controller';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { useFonts } from 'expo-font';

export default function CadastroProduto() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState();
    const [tamProdBruto, setTamProdBruto] = useState();
    const [current, setCurrent] = useState(1);
    const navigation = useNavigation();
    const flashMessageSucesso = () => {
        showMessage({
            backgroundColor: '#0bbd29',
            message: 'Sucesso no cadastro!',
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
        });
    }
    const flashMessageErro = () => {
        showMessage({
            backgroundColor: '#E06F72',
            message: 'Erro no Cadastro! Preencha todos os campos.',
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
        });
    }
    const realMask = createNumberMask({
        prefix: ['R', '$', ' '],
        delimiter: '.',
        separator: ',',
        precision: 2,
    })
    const commonMask = createNumberMask({
        prefix: ['U', 'n', ' '],
        demiliter: '.',
        separator: ',',
        precision: 2
    })
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }
    
    async function cadastraProduto() {
        if (nomeProduto != '' && precoProduto != null && tamProdBruto != null) {
            try {
                const usuario = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const snapshot = await getDocs(collection(firestore, 'produtos'));
                        const qtyProdutos = snapshot.size + 1;
                        const uid = user.uid;
                        const docRef = addDoc(collection(firestore, 'produtos'), {
                            Nome: nomeProduto,
                            PrecoProd: precoProduto,
                            TamProd: tamProdBruto,
                            UnidadeMedida: current,
                            IDUsuario: uid,
                            IDProduto: qtyProdutos
                        });
                        // console.log(docRef);
                        setNomeProduto('');
                        flashMessageSucesso();
                    }
                }
                )
            } catch (error) { flashMessageErro(); }
        } else { flashMessageErro(); }
    }
    return (
        <View style={styles.container}>
            <animatable.View animation={'fadeInRight'} style={{width:'100%'}}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title, styles.underline]}>Cadastrar Produto</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                            <Ionicons
                                size={30}
                                color={'#99BC85'}
                                name='home' />
                        </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.compound}>
                        <Text style={styles.subtitle}>Nome do produto</Text>
                        <TextInput
                            placeholder="Digite o ingrediente"
                            placeholderTextColor={'#000'}
                            value={nomeProduto}
                            onChangeText={(value) => setNomeProduto(value)}
                            style={styles.input} />
                        <Text style={styles.subtitle}>Unidade de Medida</Text>
                        <RadioButtonGroup
                            selected={current}
                            onSelected={(value) => setCurrent(value)}
                            radioBackground="black">
                            <RadioButtonItem value='1' label={<Text style={styles.textRadio}> Kilos (Kg)</Text>} style={styles.radio} />
                            <RadioButtonItem value='2' label={<Text style={styles.textRadio}> Gramas (g)</Text>} style={styles.radio} />
                            <RadioButtonItem value='3' label={<Text style={styles.textRadio}> Litros (Lt)</Text>} style={styles.radio} />
                            <RadioButtonItem value='4' label={<Text style={styles.textRadio}> Mililitros (Ml)</Text>} style={styles.radio} />
                            <RadioButtonItem value='5' label={<Text style={styles.textRadio}> Unidade (Un)</Text>} style={styles.radio} />
                        </RadioButtonGroup>
                        <Text style={styles.subtitle}>Preço do produto</Text>
                        <MaskInput style={styles.input}
                            value={precoProduto} // Bind to the precoProduto state
                            mask={realMask}
                            onChangeText={(masked, unmasked) => {
                                setPrecoProduto(unmasked); // Update the state with unmasked value
                            }} />
                        {/* <NumericInput
                        value={precoProduto} onChange={value => setPrecoProduto(value)}
                        rounded valueType='real'
                        totalWidth={170} totalHeight={50}
                        textColor={'black'} borderColor={'#000'} rightButtonBackgroundColor={'#fff'} leftButtonBackgroundColor={'#fff'} /> */}
                        <View style={{display: 'flex', flexDirection:'row', alignItems: 'center', marginTop: '5%' }}>
                            <Text style={styles.subtitle}>Tamanho do produto</Text>
                            <Ionicons   
                                name='alert-circle-outline' 
                                size={25} 
                                style={{ marginLeft: '2%', marginBottom: '1%'}} />
                        </View>
                            {/* <Text style={styles.rodape}>** Cadastre o peso/litragem/unidade do produto. Ex: Para uma barra de chocolate de 2Kg, cadastre 2 no campo abaixo e selecione Kg em Unidade de Medida.</Text>     */}
                        <MaskInput style={styles.input}
                            value={tamProdBruto}
                            mask={commonMask}
                            onChangeText={(masked, unmasked) => {
                                setTamProdBruto(unmasked);
                            }} />
                        <TouchableOpacity style={styles.buttonCadastrar} onPress={cadastraProduto}>
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 120 }}>
                    </View>
                </ScrollView>
            </animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        width:'100%'
        // padding: 10
    },
    // content: {
    //     backgroundColor: '#fff',
    //     height: '85%',
    //     width: '100%',
    //     borderRadius: 24,
    //     paddingStart: '5%',
    //     paddingEnd: '5%',
    // },
    compound: {
        paddingLeft: 20,
        paddingRight: 20,
        width:'100%'
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
    subtitle: {
        fontSize: 20,
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        fontFamily: 'Quicksand-Regular',
        color: '#99BC85',
        marginBottom: '2%',
        borderColor: '#000',
        // borderWidth:1
    },
    input: {
        color: '#000',
        backgroundColor: '#E1F0DA',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        height: 40,
        fontSize: 14,
        borderColor: '#99BC85',
    },
    backButton: {
        marginRight: '5%',
        marginTop: '13%'
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        // marginTop: '8%',
        borderBottomWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5',
        height: '15%',

    
    },
    underline: {
        textDecorationLine: 'underline'
    },
    radio: {
        borderColor: '#000',
        marginTop: 1,
        backgroundColor: '#E1F0DA',

    },
    textRadio: {
        color: '#000',
        fontFamily: 'Quicksand-Regular',
        margin: 10
    },
    rodape: {
        fontSize: 10,
        color: '#000',
        marginBottom: 10,
    },
    buttonCadastrar: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 45,
        width: '100%',
        marginTop: 30,
        marginBottom: 6,
        padding: 4,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5'
    },
    textButton: {
        color: '#000',
        fontFamily: 'Quicksand-Regular',
        alignSelf: 'center'
    }
})
