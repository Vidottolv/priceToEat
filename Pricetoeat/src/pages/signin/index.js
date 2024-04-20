import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button, Image, PermissionsAndroid, launchImageLibrary, useEffect,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper';
import * as animatable from 'react-native-animatable';
import { Ionicons } from "@expo/vector-icons";
import app from "../../firebaseConfig";
import { ModalTrocaSenha } from '../../components/modais/modalTrocaSenha';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import { Messages } from '../../components/messages';

export default function Signin(){
    const { MSG_SucessoLogin } = Messages();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
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
            // setTimeout( 
            //     () => {
            //         Messages.MSG_SucessoLogin,
            //         navigation.navigate('home')},
            //     duration = 2000)
            const user = userCredential.user;
            console.log('sucesso')
        }).catch(error => {
        })}
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const toggleSecureEntry = () => {
        setEscondeSenha(!escondeSenha);
    };

    const handleCreateAccount = (email, senha, nome) => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    nome
                };
                const usersRef = collection(firestore, 'usuarios');
                const userDoc = doc(usersRef, uid);
                setDoc(userDoc, data);
                setSnackbarSucesso(true);
                setTimeout(() => setSnackbarSucesso(false), 1999)
                setTimeout(() => navigation.navigate('home'), duration = 2000)
            }).catch(error => {
                console.log(error)
                setSnackbarErro(true);
                setTimeout(() => setSnackbarErro(false), 2000)
            })
    }
          
    return(
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.6, 0.8]}
                colors={['#99BC85', '#fff']}>
            <ScrollView>
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
                        <TouchableOpacity 
                            style={styles.SpaceIcon} 
                            activeOpacity={1}
                            onPress={toggleSecureEntry}>
                                <Ionicons 
                                    name={escondeSenha ?
                                     "eye-outline" : "eye-off-outline"}
                                    size={24}
                                    color="black"
                                    style={styles.icon}/>
                        </TouchableOpacity>
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
                </View>)}
                {cadastroSelected && (
                    <View>
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
                        <View style={{flexDirection:'row'}}>
                        <TextInput
                            placeholder="Sua Senha"
                            placeholderTextColor={'#939e96'}
                            value={senhaCadastro}
                            onChangeText={(value) => setSenhaCadastro(value)}
                            style={styles.inputSenha}
                            secureTextEntry={escondeSenha} />
                        <TouchableOpacity 
                            style={styles.SpaceIcon} 
                            activeOpacity={1}
                            onPress={toggleSecureEntry}>
                                <Ionicons 
                                    name={escondeSenha ?
                                     "eye-outline" : "eye-off-outline"}
                                    size={24}
                                    color="black"
                                    style={styles.icon}/>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            style={styles.buttonAcessarCadastrar} 
                            onPress={() => uploadMedia()}>
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
            </ScrollView>
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
        marginBottom:42,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextAcessarCadastrar:{
        color:'#FFF',
        fontSize:16,
        fontFamily:'Quicksand-Regular',
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
    buttonSelectPhoto:{
        backgroundColor:'#99BC85',
        borderRadius:72,
        paddingVertical:8,
        height:120,
        width:120,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderWidth:2,
        borderColor:'#BFD8AF'
    },
    selectedImage:{
        width:120,
        height:120,
        borderRadius:72,
        borderWidth:2,
        borderColor:'#BFD8AF'
    },
    buttonPhotoText:{
        color:'#FFF',
        fontFamily:'Quicksand-Regular'
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
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8,
        height:60,
        marginBottom:12,
        fontSize:16,
        width:'80%',
        padding:20,
    },
    SpaceIcon:{
        width:'20%',
        color:'#000',
        height:60, 
        backgroundColor:'#FFF',
        borderBottomRightRadius:8,
        borderTopRightRadius:8
    },
    icon:{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'25%',
    }
})