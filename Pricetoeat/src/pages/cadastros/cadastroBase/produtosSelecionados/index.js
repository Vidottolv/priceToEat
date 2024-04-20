import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import { firestore, auth } from '../../../../controller';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useGlobalContext } from '../../../../components/context/produtoContext';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ProdutosSelecionados = () => {
  const { globalArray, cleanGlobalArray } = useGlobalContext();
  const navigation = useNavigation();
  const [nomeBase, setNomeBase] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [quants, setQuants] = useState({});
  const onChangeText = (index, text) => {
    const newQuants = {...quants};
    newQuants[index] = text;
    setQuants(newQuants);
  };
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
    }
  }
  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../../../assets/fonts/Quicksand-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }
  let listaCustos = [];
  async function cadastraBase() {
    if (nomeBase != '') {
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
          const snapshot = await getDocs(collection(firestore, 'bases'));
          const qtyBases = snapshot.size + 1;
          let custoBase = 0;
          let custoTratado = 0;
          listaCustos = [];
          for (let i = 0; i < globalArray.length; i++) {
            if(globalArray[i].unidade != 'unidade'){
              custoTratado = parseInt(globalArray[i].Preco,10) / parseInt(globalArray[i].TamanhoEmbalagem,10)
            }
            else {
              custoTratado = parseInt(globalArray[i].Preco,10);
            }
            const custo = quants[i] * custoTratado;
            custoBase += custo;
            listaCustos.push({
              produto: globalArray[i].Nome,
              preco: parseInt(globalArray[i].Preco,10),
              quantidade: parseInt(quants[i],10),
              custo: custo,
              unidadeDeMedida: globalArray[i].UnidadeDeMedida,
              tamanhoEmbalagem: globalArray[i].TamanhoEmbalagem
            });
          }
          const docRef = await addDoc(collection(firestore, 'bases'), {
            IDUsuario: user.uid,
            IDBase: qtyBases,
            NomeBase: nomeBase,
            custoBase: custoBase,
            ProdutosBase: listaCustos,
            Blob: Blobbase64,
            Filename: filename
          });
          setNomeBase('');
          cleanGlobalArray();
          setTimeout( () => navigation.navigate('home'), duration = 1000)
          }
      } catch (error) {
        // flashMessageErro();
      }
    } else {
      // flashMessageErro();
    }
  }
  const renderItem = ({ item, index }) => {
    let unidade = '';
    if (item.UnidadeDeMedida == '1') { unidade = 'kgs'; }
    else if (item.UnidadeDeMedida == '2') { unidade = 'grs'; }
    else if (item.UnidadeDeMedida == '3') { unidade = 'lts'; }
    else if (item.UnidadeDeMedida == '4') { unidade = 'mls'; }
    else { unidade = 'unidade'; }
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            const isDuplicate = globalArray.includes(item);
            if (!isDuplicate) {
              removeItemFromGlobalArray(item);}}}>
          <Text style={styles.subtitleFlat}>{item.Nome} - em {unidade}</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Digite a Qtd usada"
          placeholderTextColor={'#99BC85'}
          value={quants[index]}
          onChangeText={(text) => onChangeText(index, text)}
          style={styles.input} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerModal}>
          <Text style={[styles.title, styles.underline]}>Produtos Selecionados</Text>
        </View>
        <View style={styles.body}>
        <Text style={styles.subtitle}> Nome da base:</Text>
        <TextInput
          value={nomeBase}
          onChangeText={(value) => setNomeBase(value)}
          style={[styles.input, styles.margin]} />
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
        <FlatList
          data={globalArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.IDProduto}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={cadastraBase}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProdutosSelecionados;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width:'100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  body:{
    width:'90%',
    alignSelf:'center'      
  },
  item: {
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand-Bold',
    color: '#99BC85',
    marginLeft: '3%',
    marginTop: '7%',
  },
  subtitle:{
    fontSize:20,
    fontFamily: 'Quicksand-Bold',
    color:'#000',
    color:'#99BC85',
  },
  subtitleFlat: {
    fontSize: 17,
    fontFamily: 'Quicksand-Regular',
    color: '#99BC85',
  },
  textCompound:{
    fontSize:14,
    fontFamily: 'Quicksand-Regular',
    color:'#000',
  },
  button: {
      justifyContent: 'center',
      alignSelf: 'center',
      height: 45,
      width: '100%',
      marginTop: 30,
      marginBottom: 15,
      padding: 4,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: '#99BC85',
      backgroundColor: '#D4E7C5'
  },
  buttonText: {
    fontFamily: 'Quicksand-Bold',
    textAlign:'center',
    fontSize: 16,
  },
  backButton: {
    marginRight: '5%',
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: '#99BC85',
    backgroundColor: '#D4E7C5',
    height: 130
  },
  underline: {
    textDecorationLine: 'underline'
  },
  buttonProduto:{
    borderWidth:1,
    borderRadius:30,
    marginBottom:'2%',
    borderColor:'#000',
},
  viewProduto: {
    marginLeft: '8%',
    marginBottom: '2%'
  },
  flat: {
    marginTop: '5%',
    padding:10
  },
  observation: {
    color: '#000',
    marginBottom: '3%',
    // marginLeft:'2%',
    fontFamily: 'Quicksand-Regular',
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
    marginTop:'1%'
  },
  margin: {
    marginBottom:'2%'
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
});
