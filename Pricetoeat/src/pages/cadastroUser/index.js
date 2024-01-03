import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as animatable from 'react-native-animatable';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import handleCreateAccount from "../../controller";


export default function CadastroUsuario(){
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [escondeSenha, setEscondeSenha] = useState(true);

    return( 
        <View style={styles.container}>
            <animatable.View 
                animation={'fadeInLeft'}
                style={styles.containerHeader}>
                    <Text style={styles.message}>Cadastre seu usuário</Text>
            </animatable.View>
            <animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                <Text style={styles.title}>Nome</Text>
                    <TextInput
                        placeholder="Digite seu Nome"
                        placeholderTextColor={'#F3F3FF'}
                        value={nome}
                        onChangeText={(value) => setNome(value)}
                        style={styles.input}/>
                <Text style={styles.title}>E-Mail</Text>
                    <TextInput
                        placeholder="Digite seu E-Mail"
                        placeholderTextColor={'#F3F3FF'}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        style={styles.input}/>
                <Text style={styles.title}>Senha</Text>
                <View style={styles.senhaArea}>
                    <TextInput
                        placeholder="Digite sua Senha"
                        placeholderTextColor={'#F3F3FF'}
                        value={senha}
                        onChangeText={(value) => setSenha(value)}
                        style={styles.inputSenha}
                        secureTextEntry={escondeSenha}/>
                        <TouchableOpacity 
                            style={styles.icon}
                            onPress={ () => setEscondeSenha(!escondeSenha)}>
                                {   escondeSenha ?
                                    <Ionicons name="eye-sharp" color="#FFF" size={25}/>
                                    :
                                    <Ionicons name="eye-off" color="#FFF" size={25}/>
                                }
                        </TouchableOpacity>    
                    </View>                    
                    <TouchableOpacity
                        style={styles.button} 
                        onPress={handleCreateAccount(email,senha)}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
            </animatable.View>
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
    backgroundColor:'#E7A17A',
    flex:1
},
containerHeader:{
    marginTop:'15%',
    marginBottom:'8%',
    paddingStart:'5%'
},
message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#F3F3FF'
},
containerForm:{
    backgroundColor:'#E06F72',
    flex:1,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    paddingStart:'5%',
    paddingEnd:'5%'
},
title:{
    color:'#F3F3FF',
    fontSize:20,
    marginTop:28,
    fontWeight:'bold'
},
input:{
    color:'#F3F3FF',
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    fontSize:16,
    borderBottomColor:'#DADADA'
},
button:{
    backgroundColor:'#E7A17A',
    borderRadius:4,
    paddingVertical:8,
    width:'100%',
    marginTop:14,
    justifyContent:'center',
    alignItems:'center'
},
buttonText:{
    color:'#F3F3FF',
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
    marginTop:5,
    marginBottom:15,
    alignItems:'flex-end'
},
forgetText:{
    color:'#DADADA'
},
underline: {
    textDecorationLine: 'underline'
},
senhaArea: {
    flexDirection:'row',
    width:'90%'        
},
inputSenha:{
    color:'#F3F3FF',
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    fontSize:16,
    borderBottomColor:'#DADADA',
    width:'100%'
},
icon:{
    width:'10%',
    color:'#F3F3FF',
    borderBottomWidth:1,
    height:40,
    marginBottom:12,
    borderBottomColor:'#DADADA'   
}
})