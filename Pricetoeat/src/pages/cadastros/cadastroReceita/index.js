import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import * as animatable from 'react-native-animatable'
import { firestore, auth } from '../../../controller';
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
            backgroundColor:'#0bbd29',
            message: 'Sucesso no cadastro!',
            type: 'info', 
        });
    }
    const flashMessageErro = () => {
        showMessage({
            backgroundColor:'#E06F72',
            message: 'Erro no Cadastro! Preencha todos os campos.',
            type: 'info',
        });
    }

    async function cadastraProduto() {
        if (nomeProduto != '' && precoProduto != null && tamProdBruto != null) {
            const user = auth.currentUser;
            if (user) {
                    const uid = user.uid;
                    const docRef = addDoc(collection(firestore, 'produtos'), {
                        Nome: nomeProduto,
                        PrecoProd: precoProduto,
                        TamProd: tamProdBruto,
                        UnidadeMedida: current,
                        IDUsuario: uid,
                    });
                    setNomeProduto('');
                }
                flashMessageSucesso();
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
