  import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput } from 'react-native';
  import { Ionicons } from '@expo/vector-icons'
  import { useState, useEffect } from 'react';
  import { firestore, auth } from '../../../../controller';
  import { onAuthStateChanged } from 'firebase/auth';
  import { useNavigation } from '@react-navigation/native';
  import { collection, addDoc, getDocs } from "firebase/firestore";
  import { useGlobalContext } from '../../../../components/context/produtoContext';
  import { useFonts } from 'expo-font';

  const ProdutosSelecionados = () => {
    const { globalArray, removeItemFromGlobalArray } = useGlobalContext();
    const navigation = useNavigation();
    const [nomeBase, setNomeBase] = useState('');
    const [quants, setQuants] = useState({});
    const onChangeText = (index, text) => {
      const newQuants = {...quants};
      newQuants[index] = text;
      setQuants(newQuants);
    };
    const [loaded] = useFonts({
      'Quicksand-Regular': require('../../../../assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Bold': require('../../../../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-Medium': require('../../../../assets/fonts/Quicksand-Medium.ttf'),
    });
    if (!loaded) {
      return null;
    }
  

    const renderItem = ({ item, index }) => {
      let unidade = '';
      if (item.UnidadeMedida == '1') { unidade = 'kgs'; }
      else if (item.UnidadeMedida == '2') { unidade = 'grs'; }
      else if (item.UnidadeMedida == '3') { unidade = 'lts'; }
      else if (item.UnidadeMedida == '4') { unidade = 'mls'; }
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
            placeholderTextColor={'#000'}
            value={quants[index]}
            onChangeText={(text) => onChangeText(index, text)}
            style={styles.input} />
        </View>
      );
    };
    let listaCustos = [];

    async function cadastraBase() {
      if (nomeBase != '') {
        try {
          const usuario = onAuthStateChanged(auth, async (user) => {
            if (user) {
              const snapshot = await getDocs(collection(firestore, 'bases'));
              const qtyBases = snapshot.size + 1;
              let custoBase = 0;
              listaCustos = [];
              for (let i = 0; i < globalArray.length; i++) {
                const custo = quants[i] * globalArray[i].PrecoProd;
                custoBase += custo;
                listaCustos.push({
                  produto: globalArray[i].Nome,
                  preco: globalArray[i].PrecoProd,
                  quantidade: quants[i],
                  custo: custo,
                  unidade: globalArray[i].UnidadeMedida
                });
              }
              const docRef = await addDoc(collection(firestore, 'bases'), {
                Nome: nomeBase,
                IDUsuario: user.uid,
                IDBase: qtyBases,
                custoBase: custoBase,
                listaCustos: listaCustos
              });
              // console.log(docRef);
              setNomeBase('');
              // for (let i = 0; i < globalArray.length; i++) {
              //   removeItemFromGlobalArray('');
              // }
              setTimeout( () => navigation.navigate('home'), duration = 1000)
            }
          });
        } catch (error) {
          // flashMessageErro();
        }
      } else {
        // flashMessageErro();
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={[styles.title, styles.underline]}>Produtos Selecionados</Text>
            {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
              <Ionicons
                size={30}
                color={'#FFF'}
                name='home' />
            </TouchableOpacity> */}
          </View>
          <View style={styles.body}>
          <Text style={styles.observation}>Segure apertado o nome do produto para excluir ele da base.</Text>
          <Text style={styles.subtitle}> Nome da base:</Text>
          <TextInput
            value={nomeBase}
            onChangeText={(value) => setNomeBase(value)}
            style={[styles.input, styles.margin]} />
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
      textShadowRadius: 4,
      textShadowColor: '#BFD8AF',
      textShadowOffset: {
        width: 4,
        height: 2
      }
    },
    subtitle:{
      fontSize:20,
      fontFamily: 'Quicksand-Bold',
      color:'#000',
      marginTop:'2%',
      color:'#99BC85',
      textShadowRadius: 4,
      textShadowColor: '#BFD8AF',
      textShadowOffset: {
        width: 4,
        height: 2
      }
    },
    subtitleFlat: {
      fontSize: 17,
      fontFamily: 'Quicksand-Regular',
      color: '#000',
      textShadowRadius: 6,
      textShadowColor: '#000',
      textShadowOffset: {
        width: 1,
        height: 1
      }
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
        width: '90%',
        marginTop: 30,
        marginBottom: 15,
        padding: 4,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#99BC85',
        backgroundColor: '#D4E7C5'
    },
    buttonText: {
      textShadowRadius: 7,
      textShadowColor: '#000',
      textShadowOffset: {
        width: 1,
        height: 1
      },
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
      // marginTop: '8%',
      borderBottomWidth: 3,
      borderColor: '#99BC85',
      backgroundColor: '#D4E7C5',
      height: '12%'
    },
    underline: {
      textDecorationLine: 'underline'
    },
    buttonProduto:{
      borderWidth:1,
      borderRadius:30,
      marginBottom:'2%',
      borderColor:'#000',
      // width:'95%'
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
      marginBottom:'8%'
    }
  })
