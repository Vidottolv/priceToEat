import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React, { useState } from "react";
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {doc, getDoc } from 'firebase/firestore';
import { firestore, firebase } from '../../../controller';
import { useFonts } from 'expo-font';
import { app } from '../../../firebaseConfig';


export function ModalTrocaSenha ({handleClose}){ 
    const auth = getAuth(app);
    const [email,setEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    // const docRef = doc(firestore, 'usuarios', email)
    // const docSnap = getDoc(docRef)
    // const recuperaSenha = () => {sendPasswordResetEmail(auth, email)}
    // if (!docSnap != null){msg = 'Digite um email válido.'} 
    // if (docSnap != null){
    //     recuperaSenha();
    //     // console.log(docSnap);
    //     msg = '\tE-mail enviado.\n Verifique sua caixa de E-mail.'
    // }

    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const handleResetPassword = () => {
        if (email) 
        {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setResetMessage('Enviamos o email pra sua troca de senha.');
                })
                .catch((error) => {
                    setResetMessage(error.message);
                });
        } 
        else 
        {
            setResetMessage('Coloque um endereço de e-mail válido.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={styles.title}>Troque sua senha</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleClose}>
                        <Ionicons
                            size={30} 
                            color={'#000'}
                            name='close-circle-outline'/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Insira seu email abaixo para receber o e-mail de troca de senha</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Seu E-mail"
                    onChangeText={setEmail}
                    value={email}/>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.text}>Enviar</Text>
            </TouchableOpacity>
            {resetMessage ? <Text style={styles.text}>{resetMessage}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(24,24,24,0.4)',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    content:{
        backgroundColor:'#D4E7C5',
        height:'45%',
        width:'80%',
        borderRadius:24,
        borderWidth:3,
        borderColor:'#99BC85'
    },
    title:{
        fontSize:22,
        fontFamily:'Quicksand-Bold',
        color:'#000',
        marginLeft:'7%',
        marginTop:'3%'
    },
    msgSenha:{
        marginTop:20,
        marginLeft:20,
        justifyContent:'center',
        alignItems:'center',
        fontSize:16,
        color:'#000',
        fontFamily:'Quicksand-Regular'    
    },
    backButton:{
        marginTop:'3%',
        marginRight:'5%',
    },
    headerModal:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    underline: {
        textDecorationLine: 'underline'
       },
    textinput:{
        padding:10,
        borderBottomWidth:1,
        borderColor:'#000',
        fontSize:16,
        width:'95%',
        marginLeft:'2.5%',
        fontFamily:'Quicksand-Regular' 
    },
    text:{
        fontFamily:'Quicksand-Regular',    
        fontSize:14,
        padding:5
    },
    button:{
        borderWidth:2,
        borderColor:'#000',
        borderRadius:16,
        width:'30%',
        height:35,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:10,
        marginBottom:10
    }
})
