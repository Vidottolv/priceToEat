import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Image, PermissionsAndroid, launchImageLibrary, useEffect} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper';
import * as animatable from 'react-native-animatable';
import { Ionicons } from "@expo/vector-icons";
import app from "../../firebaseConfig";
import { ModalTrocaSenha } from '../../components/modais/modalTrocaSenha';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

export default function Signin(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fotoURI, setFotoURI] = useState('');
    const [nomeCadastro, setNomeCadastro] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [escondeSenha, setEscondeSenha] = useState(true);
    const [SenhaVisible, setSenhaVisible] = useState(false);
    const [loginSelected, setLoginSelected] = useState(true);
    const [cadastroSelected, setCadastroSelected] = useState(false);
    const [SnackbarSucesso, setSnackbarSucesso] = useState(false);
    const [SnackbarErro, setSnackbarErro] = useState(false);
    const handleOpenModalSenha = () => {setSenhaVisible(true);}
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const handleLoginSelect = () => { setLoginSelected(true); setCadastroSelected(false); }
    const handleCadastroSelect = () => { setLoginSelected(false); setCadastroSelected(true); }
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            navigation.navigate('home')
            const user = userCredential.user;
            console.log('sucesso')
        }).catch(error => {
            //console.log(error)
        })}
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }

    const handleCreateAccount = (email, senha, nome) => {
        createUserWithEmailAndPassword(
            auth,email,senha)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id:uid,
                    email,
                    nome
                };
                const usersRef = collection(firestore, 'usuarios');
                const userDoc = doc(usersRef, uid);
                setDoc(userDoc, data);
                setSnackbarSucesso(true);
                setTimeout(() => setSnackbarSucesso(false), 1999)
                setTimeout( () => navigation.navigate('home'), duration = 2000)
        }).catch(error => {
            console.log(error)
            setSnackbarErro(true);
            setTimeout(() => setSnackbarErro(false), 2000)
        })
    }

        // useEffect(() => {
        //     (async () => {
        //       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.log('Permissão de acesso à galeria concedida');
        //       } else {
        //         console.log('Permissão de acesso à galeria negada');
        //       }
        //     })();
        //   }, []);
        //   const handleSelectFoto = () => {
        //     launchImageLibrary({ mediaType: 'photo' }, (response) => {
        //       if (response.didCancel) {
        //         console.log('Seleção de foto cancelada');
        //       } else if (response.error) {
        //         console.log('Erro ao selecionar foto:', response.error);
        //       } else {
        //         setFotoURI(response.uri);
        //       }
        //     });
        //   };
          
          
    return(
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.6, 0.8]}
                colors={['#99BC85', '#fff']}>
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
                        placeholderTextColor={'#515151'}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        style={styles.textinput}/>
                <Text style={styles.subtitle}>Senha</Text>
                <View style={styles.senhaArea}>
                    <TextInput
                        placeholder="Sua Senha"
                        placeholderTextColor={'#515151'}
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
                        {/* <TouchableOpacity onPress={handleSelectFoto} style={styles.botaoSelecionarFoto}>
                            <Text style={styles.textoBotaoSelecionarFoto}>Selecionar Foto</Text>
                        </TouchableOpacity>
                        {fotoURI && <Image source={{ uri: fotoURI }} style={styles.fotoSelecionada} />} */}
                        <Text style={styles.titulo}>Nome</Text>
                        <TextInput
                            placeholder="Seu Nome"
                            placeholderTextColor={'#939e96'}
                            value={nomeCadastro}
                            onChangeText={(value) => setNomeCadastro(value)}
                            style={styles.textinput}/>
                        <Text style={styles.subtitle}>E-mail</Text>
                        <TextInput
                            placeholder="Seu E-Mail"
                            placeholderTextColor={'#939e96'}
                            value={emailCadastro}
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
                            onPress={() => handleCreateAccount(emailCadastro,senhaCadastro, nomeCadastro)}>
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
            <Snackbar
                visible={SnackbarSucesso}
                style={{ height: 60, backgroundColor: '#5ea955' }}>
                    Usuário foi cadastrado! Entrando no App.
            </Snackbar>
            <Snackbar
                visible={SnackbarErro}
                style={{ height: 60, backgroundColor: '#e50e0e' }}>
                    Falha ao cadastrar usuário! Tente novamente.
            </Snackbar>
            </LinearGradient>
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
        fontFamily:'Quicksand-Regular',
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
        fontFamily:'Quicksand-Bold',
        marginTop:'30%',
        color:'#000',
        alignSelf:'center',
        marginBottom:'5%'
    },
    subtitle:{
        color:'#000',
        margin:5,
        fontSize:15,
        fontFamily:'Quicksand-Regular'
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
        backgroundColor:'#BFD8AF',
        borderRadius:8, 
        flex:1
    },
    textobotaoLoginCadastro:{
        marginTop:'5%',
        fontFamily:'Quicksand-Regular',
        alignSelf:'center',
        marginBottom:'3%',
        marginTop:'3%'
    },
    textinput:{
        color:'#515151',
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
        fontFamily:'Quicksand-Regular',
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
        fontFamily:'Quicksand-Regular',
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
        color:'#515151',
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