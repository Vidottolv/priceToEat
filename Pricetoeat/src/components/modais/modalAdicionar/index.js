import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from "react";
import { useNavigation } from '@react-navigation/native';


export function ModalAdicionar (){  
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title, styles.underline]}>Erro:</Text>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                            <Ionicons
                                size={30} 
                                color={'#FFF'}
                                name='close-circle-outline'/>
                        </TouchableOpacity>
                </View>
                <Text style={styles.msgSenha}>Falha ao cadastrar produto!</Text>
                    <TouchableOpacity>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(24,24,24,0.4)',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    content:{
        backgroundColor:'#E06F72',
        height:'20%',
        width:'80%',
        borderRadius:24,
    },
    title:{
        fontSize:22,
        fontWeight:'bold',
        color:'#FFF',
        marginLeft:'7%',
        marginTop:'3%'
    },
    msgSenha:{
        marginTop:20,
        marginLeft:20,
        justifyContent:'center',
        alignItems:'center',
        fontSize:18,
        color:'#FFF',
        fontWeight:'bold'
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
})
