import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";

export default function Welcome(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                
                <animatable.Image 
                    animation={'flipInY'}
                    source={require("../../assets/logo.png")} 
                    style={{
                        width:'100%',
                        resizeMode:'contain'}}/> 
            </View>
            <animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
            <Text style={styles.title}>Te ajudando a ter lucro em suas receitas sempre!</Text>
            <Text style={styles.text}>Faça login para continuar</Text>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('signin')}
            >
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
            </animatable.View>
        </View>
)}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E7A17A',
        flex:1
    },
    containerLogo:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#E7A17A',
    },
    containerForm:{
        flex:1,
        backgroundColor:'#E06F72',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:'5%',
        paddingEnd:'5%'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:28,
        marginBottom:12,
        color:'#F3F3FF'
    },
    text:{
        color:'#DADADA',
        fontSize:16
    },
    button:{
        position:'absolute',
        backgroundColor:'#E19063',
        borderRadius:50,
        paddingVertical:8,
        width:'60%',
        alignSelf:'center',
        bottom:'15%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:16,
        color:'#F3F3FF',
        fontWeight:'bold'
    }
})