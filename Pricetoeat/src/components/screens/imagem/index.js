import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../../controller';
import { doc, updateDoc} from "firebase/firestore";
import { auth } from '../../../controller';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ImagemReceita({ route, navigation }) {
    const [image, setImage] = useState(null);
    const { receitaId } = route.params;
    const [uploading, setUploading] = useState(false);
    const cancelEdit = () => { navigation.goBack(); };

    let result = '';
    const uploadMediaFile = async () => {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(image)
        }
    }

  async function cadastraImagem() {
        try {
            const user = auth.currentUser;
            if (user) {
                let Blobbase64 = null; 
                let filename = null; 

                if (image) {
                    const { uri } = await FileSystem.getInfoAsync(image);
                    const blob = await new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = () => { 
                            resolve(xhr.response); 
                        };
                        xhr.onerror = (e) => { 
                            reject(new TypeError('Network Request Failed')); 
                        };
                        xhr.responseType = 'blob';
                        xhr.open('GET', uri, true);
                        xhr.send(null);
                    });
                    filename = image.substring(image.lastIndexOf('/') + 1);
                    const blobData = await new Response(blob).blob();
                    const reader = new FileReader();
                    reader.readAsDataURL(blobData);
                    await new Promise(resolve => {
                        reader.onload = () => {
                            Blobbase64 = reader.result;
                            resolve();
                        };
                    });
                }
                const docRef = doc(firestore, 'receitas', receitaId);
                const update = await updateDoc(docRef, {
                    Filename: filename,
                    Blob: Blobbase64
                });
                console.log(update);
                // flashMessageSucesso();
                navigation.goBack();
            }
        } catch (error) {
            console.log(error)
            // flashMessageErro();
        }
    }

  return (
   <View style={styles.container}>
    <animatable.View animation={'fadeInRight'} style={{width:'100%'}}>
        <View style={styles.headerModal}>
            <Text style={[styles.title, styles.underline]}>Cadastrar Imagem</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => cancelEdit()}>
                    <Ionicons
                        size={30}
                        color={'#99BC85'}
                        name='home'/>
                </TouchableOpacity>
            </View>
        <View style={styles.compound}>
            <Text style={styles.subtitle}>Nome do produto</Text>
            <TouchableOpacity
                style={styles.buttonSelectPhoto}
                onPress={uploadMediaFile}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    ) : (
                        <Text style={styles.buttonPhotoText}>Escolha a Foto</Text>
                    )}
            </TouchableOpacity>
                <TouchableOpacity 
                    onPress={cadastraImagem}
                    style={styles.buttonCadastrar}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
        </View>
    </animatable.View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        width:'100%'
    },
    compound: {
        paddingLeft: 20,
        paddingRight: 20,
        width:'100%'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Quicksand-Bold',
        color: '#99BC85',
        marginLeft: '3%',
        marginTop: '13%',
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 4,
            height: 2
        }
    },
    subtitle: {
        marginTop:'3%',
        fontSize: 20,
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        fontFamily: 'Quicksand-Bold',
        color: '#99BC85',
        marginBottom: '5%',
        borderColor: '#000',
    },
    input: {
        color: '#000',
        backgroundColor: '#E1F0DA',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        height: 40,
        fontSize: 14,
        borderColor: '#99BC85',
        marginBottom:15
    },
    backButton: {
        marginRight: '5%',
        marginTop: '13%'
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5',
        height: '25%',  
    },
    underline: {
        textDecorationLine: 'underline'
    },
    buttonCadastrar: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 45,
        width: '100%',
        marginTop: 10,
        marginBottom: 6,
        padding: 4,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5'
    },
    textButton: {
        color: '#000',
        fontFamily: 'Quicksand-Regular',
        alignSelf: 'center'
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
})

