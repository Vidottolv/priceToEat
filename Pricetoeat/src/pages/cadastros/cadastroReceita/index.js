import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import * as animatable from 'react-native-animatable'
import  { RadioButtonItem, RadioButtonGroup } from 'expo-radio-button';
import NumericInput from 'react-native-numeric-input'
import { firestore, auth } from '../../../controller';
import {onAuthStateChanged} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from 'react-native-flash-message';




export default function CadastroReceita(){
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState();
    const [tamProdBruto, setTamProdBruto] = useState();
    const [current, setCurrent] = useState(1);
    const navigation = useNavigation();
    const flashMessageSucesso = () => {
        showMessage({
            backgroundColor:'#E06F72',
            message: 'Sucesso no cadastro!',
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
        });
    }
    const flashMessageErro = () => {
        showMessage({
            backgroundColor:'#E06F72',
            message: 'Erro no Cadastro! Preencha todos os campos.',
            type: 'info', // Pode ser 'info', 'success', 'warning' ou 'danger'
        });
    }

    async function cadastraProduto() {
        if (nomeProduto != '' && precoProduto != null && tamProdBruto != null) {
            const usuario = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    const docRef = addDoc(collection(firestore, 'produtos'), {
                        Nome: nomeProduto,
                        PrecoProd: precoProduto,
                        TamProd: tamProdBruto,
                        UnidadeMedida: current,
                        IDUsuario: uid,
                    });
                    console.log(docRef);
                    setNomeProduto('');
                }
                flashMessageSucesso();
            }
            )
        }
        flashMessageErro();
    }

    return(
        <SafeAreaView style={styles.container}>
            <animatable.View animation={'fadeInRight'}>
            <ScrollView>
                    <View style={styles.headerModal}>
                        <Text style={[styles.title,styles.underline]}>Cadastrar Receita</Text>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                                    <Ionicons
                                        size={30} 
                                        color={'#FFF'}
                                        name='home'/>
                            </TouchableOpacity>
                    </View>
                {/* <Text style={styles.subtitle}>Nome do produto</Text>
                    <TextInput
                        placeholder="Digite o ingrediente"
                        placeholderTextColor={'#F3F3FF'}
                        value={nomeProduto}
                        onChangeText={(value) => setNomeProduto(value)}
                        style={styles.input}/>
                <Text style={styles.subtitle}>Unidade de Medida</Text>
                <RadioButtonGroup
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground="black">
                        <RadioButtonItem value='1' label={<Text style={styles.textRadio}> Kilos (Kg)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='2' label={<Text style={styles.textRadio}> Gramas (g)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='3' label={<Text style={styles.textRadio}> Litros (Lt)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='4' label={<Text style={styles.textRadio}> Mililitros (Ml)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='5' label={<Text style={styles.textRadio}> Unidade (Un)</Text>} style={styles.radio}/>
                </RadioButtonGroup>
                <Text style={styles.subtitle}>Preço do produto</Text>
                    <NumericInput 
                        value={precoProduto} onChange={value => setPrecoProduto(value)}
                        rounded valueType='real'
                        totalWidth={170} totalHeight={50}
                        textColor={'white'} borderColor={'#F3F3FF'} rightButtonBackgroundColor={'#F3F3FF'} leftButtonBackgroundColor={'#F3F3FF'}/>
                <Text style={styles.subtitle}>Tamanho do produto</Text>
                <Text style={styles.rodape}>** Cadastre o peso/litragem/unidade do produto. Ex: Para uma barra de chocolate de 2Kg, cadastre 2 no campo abaixo e selecione Kg em Unidade de Medida.</Text>
                <NumericInput 
                        value={tamProdBruto} onChange={value => setTamProdBruto(value)}
                        rounded 
                        totalWidth={170} totalHeight={50}
                        textColor={'white'} borderColor={'#F3F3FF'} rightButtonBackgroundColor={'#F3F3FF'} leftButtonBackgroundColor={'#F3F3FF'}/> */}
                <TouchableOpacity style={styles.buttonCadastrar} onPress={cadastraProduto}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
                </ScrollView>
              </animatable.View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E7A17A',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        padding:10
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
    },
    subtitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#F3F3FF',
        marginTop:'5%',
        marginBottom:'2%'  
    },
    input:{
        color:'#F3F3FF',
        borderBottomWidth:1,
        height:40,
        fontSize:14,
        borderBottomColor:'#DADADA'
    },
    backButton:{
        marginRight:'5%',
    },
    headerModal:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        marginTop:'8%'
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
    }

})
