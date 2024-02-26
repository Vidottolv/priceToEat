import { signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper';
import * as animatable from 'react-native-animatable';
import { Ionicons } from "@expo/vector-icons";
import app from "../../firebaseConfig";
// import useSignIn from './useSignIn'
import { ModalTrocaSenha } from '../../components/modais/modalTrocaSenha';
import { LinearGradient } from 'expo-linear-gradient';
// import { handleCreateAccount } from "../../controller";
import validator from "validator";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signin(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nomeCadastro, setNomeCadastro] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [escondeSenha, setEscondeSenha] = useState(true);
    const [SenhaVisible, setSenhaVisible] = useState(false);
    const [loginSelected, setLoginSelected] = useState(true);
    const [cadastroSelected, setCadastroSelected] = useState(false);
    // const emailRegex = /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6}$/;
    const handleOpenModalSenha = () => {setSenhaVisible(true);}
    const auth = getAuth(app)
    // const validateEmail = (email) => {
    //     return validator.isEmail(email) && emailRegex.test(email);
    // };
    // const validatePassword = (password) => {
    //     return passwordRegex.test(password);
    // };
    const handleLoginSelect = () => {
      setLoginSelected(true);
      setCadastroSelected(false);
    };
    const handleCadastroSelect = () => {
      setLoginSelected(false);
      setCadastroSelected(true);
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            navigation.navigate('home')
            const user = userCredential.user;
            console.log('sucesso')
        }).catch(error => {
            //console.log(error)
        })}

    const handleCreateAccount = (email, senha) => {
        createUserWithEmailAndPassword(
            auth,email,senha)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id:uid,
                    email,
                    nome,
                };
                const usersRef = collection(firestore, 'usuarios');
                const userDoc = doc(usersRef, uid);
                setDoc(userDoc, data);
            setTimeout( () => navigation.navigate('home'), duration = 2000)
        }).catch(error => {
            console.log(error)
        })
    }

    return(
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.7, 0.8]}
                colors={['#c8e29d', '#fff']}>
            <animatable.View animation={'fadeInUp'} style={styles.containerForm}>
            <Text style={[styles.title, styles.underline]}> PriceT'eat </Text>
            <View style={styles.rowLoginCadastro}>
                <TouchableOpacity
                    style={[styles.botoesLoginCadastro, loginSelected && styles.buttonSelected]}
                    onPress={handleLoginSelect}>
                <Text style={styles.textobotaoLoginCadastro}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.botoesLoginCadastro, cadastroSelected && styles.buttonSelected]}
                    onPress={handleCadastroSelect}>
                <Text style={styles.textobotaoLoginCadastro}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
            {loginSelected && ( 
            <View>
                <Text style={styles.subtitle}>Endereço de E-mail</Text>
                    <TextInput
                        placeholder="Seu E-Mail"
                        placeholderTextColor={'#939e96'}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        style={styles.textinput}/>
                <Text style={styles.subtitle}>Senha</Text>
                <View style={styles.senhaArea}>
                    <TextInput
                        placeholder="Sua Senha"
                        placeholderTextColor={'#939e96'}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style={styles.inputSenha}
                        secureTextEntry={escondeSenha}/>
                    {/* <TouchableOpacity 
                        style={[styles.icon, { position: 'absolute', right:-30, top: 18 }]}
                        onPress={ () => setEscondeSenha(!escondeSenha)}>
                            {   escondeSenha ?
                                <Ionicons name="eye-sharp" color="#000" size={25}/>
                                :
                                <Ionicons name="eye-off" color="#000" size={25}/>
                            }
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity 
                    style={styles.buttonForget} 
                    onPress={handleOpenModalSenha}>
                        <Text style={styles.forgetText}>Esqueceu a senha?</Text>
                </TouchableOpacity>    
                <TouchableOpacity 
                    style={styles.buttonAcessarCadastrar} 
                    onPress={handleSignIn}>
                        <Text style={styles.buttonTextAcessarCadastrar}>Acessar</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                    style={styles.buttonRegister} 
                    onPress={() => navigation.navigate('cadastroUsuario')}>
                        <Text style={[styles.registerText, styles.underline]}>Novo por aqui? Cadastre-se</Text>
                </TouchableOpacity> */}
                </View>)}
                {cadastroSelected && (
                    <View>
                        <Text style={styles.subtitle}>Nome</Text>
                        <TextInput
                            placeholder="Seu nome completo"
                            placeholderTextColor={'#939e96'}
                            value={nomeCadastro}
                            onChangeText={(value) => setNomeCadastro(value)}
                            style={styles.textinput}/>
                        <Text style={styles.subtitle}>E-mail</Text>
                        <TextInput
                            placeholder="Seu E-Mail"
                            placeholderTextColor={'#939e96'}
                            value={emailCadastro}aces
                            onChangeText={(value) => setEmailCadastro(value)}
                            style={styles.textinput}/>
                        <Text style={styles.subtitle}>Senha</Text>
                        <TextInput
                            placeholder="Sua Senha"
                            placeholderTextColor={'#939e96'}
                            value={senhaCadastro}
                            onChangeText={(value) => setSenhaCadastro(value)}
                            style={styles.inputSenha}
                            secureTextEntry={escondeSenha}/>
                        {/* <TouchableOpacity 
                            style={[styles.icon, { position: 'absolute', right:-30, top: 215 }]}
                            onPress={ () => setEscondeSenha(!escondeSenha)}>
                                {   escondeSenha ?
                                    <Ionicons name="eye-sharp" color="#000" size={25}/>
                                    :
                                    <Ionicons name="eye-off" color="#000" size={25}/>
                                }
                        </TouchableOpacity> */}
                        <TouchableOpacity 
                            style={styles.buttonAcessarCadastrar} 
                            onPress={handleCreateAccount(email,password)}>
                            <Text style={styles.buttonTextAcessarCadastrar}>Cadastrar</Text>
                        </TouchableOpacity>
                 </View>
                )}
            <Modal 
                visible={SenhaVisible}
                animationType='fade' 
                transparent={true}>
                    <ModalTrocaSenha handleClose={() => setSenhaVisible(false)} email={email}/>
            </Modal>
            </animatable.View>
            </LinearGradient>
            <Snackbar 
                    duration={2000}
                    style={{height:60, backgroundColor:'#5ea955'}}>
                    Usuário foi cadastrado! Entrando no App.
            </Snackbar>
            <Snackbar 
                    duration={2000}
                    style={{height:60, backgroundColor:'#e50e0e'}}>
                    Falha ao cadastrar usuário! Tente novamente.
            </Snackbar>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        },
    gradient: {
        height: '100%',
        width: '100%',
      },
    containerHeader:{
        marginTop:'15%',
        marginBottom:'8%',
    },
    message:{
        fontSize:28,
        fontWeight:'bold',
        color:'#F3F3FF'
    },
    containerForm:{
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingHorizontal: 20,
    },
    title:{
        fontSize:50,
        fontWeight:'bold',
        marginTop:'30%',
        color:'#000',
        alignSelf:'center',
        marginBottom:'5%'
    },
    subtitle:{
        color:'#000',
        margin:5,
        fontSize:15,
        fontWeight:'bold'
    },
    rowLoginCadastro:{
        display:'flex',
        flexDirection: 'row',
        alignItems: "center",
        marginTop:'5%',
        marginBottom:'5%',
        columnGap: 10,
    },
    buttonSelected: {
        backgroundColor: '#FFF',
        borderWidth:1,
      },
    botoesLoginCadastro:{
        backgroundColor:'#9EC976',
        borderRadius:8, 
        flex:1
    },
    textobotaoLoginCadastro:{
        marginTop:'5%',
        fontWeight:'bold',
        alignSelf:'center',
        marginBottom:'3%',
        marginTop:'3%'
    },
    textinput:{
        color:'#939e96',
        borderRadius:8,
        backgroundColor:'#FFF',
        height:60,
        marginBottom:8,
        fontSize:16,
        padding:20
    },
    buttonAcessarCadastrar:{
        backgroundColor:'#000',
        borderRadius:12,
        paddingVertical:8,
        height:60,
        width:'100%',
        marginTop:14,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextAcessarCadastrar:{
        color:'#FFF',
        fontSize:16,
        fontWeight:'bold'
    },
    buttonRegister:{
        marginTop:14,
        alignSelf:'center',
    },
    registerText:{
        color:'#DADADA'
    },
    buttonForget:{
        color:'#F3F3FF',
        fontSize:16,
        fontWeight:'bold',
        marginBottom:15,
        alignItems:'flex-end'
    },
    forgetText:{
        color:'#000'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    senhaArea: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between'        
    },
    inputSenha:{
        color:'#939e96',
        backgroundColor:'#FFF',
        borderRadius:8,
        height:60,
        marginBottom:12,
        fontSize:16,
        width:'100%',
        padding:20,
    },
    icon:{
        width:'20%',
        color:'#000',
        height:60,
        marginBottom:12
        
    }
})