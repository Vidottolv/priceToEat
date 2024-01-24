import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../controller';


export function ModalAdicionar({ produto, handleClose }) {

    async function addProdutoArray({ produto }) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const array = [];
                    array.push(produto);
                    console.log(array);
                    handleClose();
                } catch (error) {
                    console.error('erro', error);
                }
            }
        });
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={styles.title}>Adicionar produto?</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                        <Ionicons size={35} color={'#FFF'} name='close-circle-outline' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Aceite a adição do Produto para que ele faça parte da base.</Text>
                <View style={styles.centerModal}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => addProdutoArray({ produto })}
                    >
                        <Text style={styles.textButton}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                        <Text style={styles.textButton}>Não</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24,24,24,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    content: {
        backgroundColor: '#E06F72',
        height: '30%',
        width: '80%',
        borderRadius: 22,
        borderWidth:1,
        borderColor:'#FFF'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: '7%',
        marginTop: '3%'
    },
    textButton: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backButton: {
        marginTop: '3%',
        marginRight: '5%',
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    centerModal: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 25,
        height: 40,
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        color:'#FFF',
        marginLeft:'7%',
        marginRight:'7%'
    }
})
