  import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput } from 'react-native';
  import { Ionicons } from '@expo/vector-icons'
  import { useState, useEffect } from 'react';
  import { firestore, auth } from '../../../../controller';
  import { onAuthStateChanged } from 'firebase/auth';
  import { useNavigation } from '@react-navigation/native';
  import { collection, addDoc, getDocs } from "firebase/firestore";
  import { useGlobalContext } from '../../../../components/context/produtoContext';

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
            placeholderTextColor={'#F3F3FF'}
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
                  custo: custo
                });
              }
              const docRef = await addDoc(collection(firestore, 'bases'), {
                Nome: nomeBase,
                IDUsuario: user.uid,
                IDBase: qtyBases,
                custoBase: custoBase,
                listaCustos: listaCustos
              });
              console.log(docRef);
              setNomeBase('');
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
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
              <Ionicons
                size={30}
                color={'#FFF'}
                name='home' />
            </TouchableOpacity>
          </View>
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
      </SafeAreaView>
    );
  };

  export default ProdutosSelecionados;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E7A17A',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    content: {
      flex: 1,
      width: '90%',
    },
    item: {
      borderColor: '#FFF',
      borderBottomWidth: 1,
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: '1%',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF',
    },
    subtitleFlat: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#FFF',
    },
    textCompound: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: '1%'
    },
    button: {
      backgroundColor:"#E19063",
      borderRadius: 20,
      paddingVertical: 8,
      width: '100%',
      marginTop: 14,
      marginBottom:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor:'#FFF'
    },
    buttonText: {
      color: '#F3F3FF',
      fontSize: 16,
      fontWeight: 'bold'
    },
    backButton: {
      marginRight: '5%',
    },
    headerModal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginTop: '10%'
    },
    underline: {
      textDecorationLine: 'underline'
    },
    buttonProduto: {
      borderWidth: 1,
      borderRadius: 30,
      marginBottom: '2%',
      borderColor: '#FFF',
      width: '95%'
    },
    viewProduto: {
      marginLeft: '8%',
      marginBottom: '2%'
    },
    flat: {
      marginTop: '5%'
    },
    observation: {
      color: '#FFF',
      marginBottom: '5%'
    },
    input: {
      color: '#F3F3FF',
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      borderBottomColor: '#DADADA'
    },
    margin: {
      marginBottom:'8%'
    }

  })
