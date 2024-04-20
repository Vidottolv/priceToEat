import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import * as animatable from 'react-native-animatable'
import { RadioButtonItem, RadioButtonGroup } from 'expo-radio-button';
import { firestore, auth } from '../../../controller';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { useFonts } from 'expo-font';
import { Tooltip } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function CadastroProduto() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState();
    const [tamProdBruto, setTamProdBruto] = useState();
    const [current, setCurrent] = useState(1);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation();
    const flashMessageSucesso = () => {
        showMessage({
            backgroundColor: '#0bbd29',
            message: 'Sucesso no cadastro!',
            type: 'info',
        });
    }
    const flashMessageErro = () => {
        showMessage({
            backgroundColor: '#E06F72',
            message: 'Erro no Cadastro! Preencha todos os campos.',
            type: 'info',
        });
    }
    const realMask = createNumberMask({
        prefix: ['R', '$', ' '],
        delimiter: '.',
        separator: ',',
        precision: 2,
    })
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
    const [loaded] = useFonts({
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../../../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Medium': require('../../../assets/fonts/Quicksand-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }
    
      async function cadastraProduto() {
        if (nomeProduto != '' && precoProduto != null && tamProdBruto != null) {
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
    
                    const snapshot = await getDocs(collection(firestore, 'produtos'));
                    const qtyProdutos = snapshot.size + 1;
                    const docRef = await addDoc(collection(firestore, 'produtos'), {
                        Nome: nomeProduto,
                        Preco: parseInt(precoProduto, 10),
                        TamanhoEmbalagem: parseInt(tamProdBruto, 10),
                        UnidadeDeMedida: current,
                        IDUsuario: user.uid,
                        IDProduto: qtyProdutos,
                        Filename: filename,
                        Blob: Blobbase64
                    });
                    console.log(docRef);
                    setNomeProduto('');
                    flashMessageSucesso();
                    navigation.goBack();
                }
            } catch (error) {
                flashMessageErro();
            }
        } else {
            flashMessageErro();
        }
    }
    
    return (
        <View style={styles.container}>
            <animatable.View animation={'fadeInRight'} style={{width:'100%'}}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title, styles.underline]}>Cadastrar Produto</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
                            <Ionicons
                                size={30}
                                color={'#99BC85'}
                                name='home' />
                        </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.compound}>
                        <Text style={styles.subtitle}>Foto do Produto</Text>
                        <TouchableOpacity
                            style={styles.buttonSelectPhoto}
                            onPress={uploadMediaFile}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.selectedImage} />
                                ) : (
                                    <Text style={styles.buttonPhotoText}>Escolha a Foto</Text>
                                )}
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>Nome do produto</Text>
                        <TextInput
                            placeholder="Digite o ingrediente"
                            placeholderTextColor={'#99BC85'}
                            value={nomeProduto}
                            onChangeText={(value) => setNomeProduto(value)}
                            style={styles.input} />
                        <Text style={styles.subtitle}>Unidade de Medida</Text>
                        <RadioButtonGroup
                            selected={current}
                            onSelected={(value) => setCurrent(value)}
                            radioBackground="#99BC85">
                            <RadioButtonItem value='1' label={<Text style={styles.textRadio}> Kilos (Kg)</Text>} style={styles.radio} />
                            <RadioButtonItem value='2' label={<Text style={styles.textRadio}> Gramas (g)</Text>} style={styles.radio} />
                            <RadioButtonItem value='3' label={<Text style={styles.textRadio}> Litros (Lt)</Text>} style={styles.radio} />
                            <RadioButtonItem value='4' label={<Text style={styles.textRadio}> Mililitros (Ml)</Text>} style={styles.radio} />
                            <RadioButtonItem value='5' label={<Text style={styles.textRadio}> Unidade (Un)</Text>} style={styles.radio} />
                        </RadioButtonGroup>
                        <Text style={styles.subtitle}>Preço do produto</Text>
                        <MaskInput style={styles.input}
                            value={precoProduto}
                            mask={realMask}
                            onChangeText={(masked, unmasked) => {
                                setPrecoProduto(unmasked);
                            }} />
                        <View style={{display: 'flex', flexDirection:'row', alignItems: 'center', marginTop: '5%' }}>
                            <Text style={styles.subtitle}>Tamanho do produto</Text>
                            <Tooltip
                                width={300}
                                height={80}
                                containerStyle={{backgroundColor:'#99BC85'}}
                                pointerColor='#99BC85'
                                popover={<Text>o Tamanho do Produto é a quantidade que vem em cada embalagem. Por ex: Um saco de arroz pesa 5kg, o Tamanho dele é 5.</Text>}>
                                    <Ionicons   
                                        name='alert-circle-outline' 
                                        size={25} 
                                        color={'#99BC85'}
                                        style={{ marginLeft: '5%', marginBottom: '1%'}} />
                            </Tooltip>
                        </View>
                        <MaskInput style={styles.input}
                            value={tamProdBruto}
                            onChangeText={(masked, unmasked) => {
                                setTamProdBruto(unmasked);
                            }} />
                        <TouchableOpacity style={styles.buttonCadastrar} onPress={cadastraProduto}>
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 200 }}>
                    </View>
                </ScrollView>
            </animatable.View>
        </View>
    )
}

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
        fontSize: 20,
        textShadowRadius: 4,
        textShadowColor: '#BFD8AF',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        fontFamily: 'Quicksand-Regular',
        color: '#99BC85',
        marginBottom: '2%',
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
        height: '15%',    
    },
    underline: {
        textDecorationLine: 'underline'
    },
    radio: {
        borderColor: '#99BC85',
        marginTop: 1,
        backgroundColor: '#E1F0DA',

    },
    textRadio: {
        color: '#99BC85',
        fontFamily: 'Quicksand-Bold',
        margin: 10
    },
    rodape: {
        fontSize: 10,
        color: '#000',
        marginBottom: 10,
    },
    buttonCadastrar: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 45,
        width: '100%',
        marginTop: 30,
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
