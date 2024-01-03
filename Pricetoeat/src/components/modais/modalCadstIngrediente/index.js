import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView,} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import * as animatable from 'react-native-animatable'
import  { RadioButtonItem, RadioButtonGroup } from 'expo-radio-button';
import NumericInput from 'react-native-numeric-input'


export function ModalCadastroIngrediente({ handleClose }){
    const [nomeIng, setNomeIng] = useState('');
    const [precoIng, setPrecoIng] = useState();
    const [tamProdBruto, setTamProdBruto] = useState();
    const [current, setCurrent] = useState(2);

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{flex:1, zIndex:9}}></TouchableOpacity>
            <animatable.View animation={'fadeInUpBig'} style={styles.content}>
            <ScrollView>
                    <View style={styles.headerModal}>
                        <Text style={[styles.title,styles.underline]}>Cadastrar Produto</Text>
                            <TouchableOpacity style={styles.backButton} onPress={handleClose}>
                                    <Ionicons
                                        size={30} 
                                        color={'#FFF'}
                                        name='close-circle-outline'/>
                            </TouchableOpacity>
                    </View>
                <Text style={styles.subtitle}>Nome do produto</Text>
                    <TextInput
                        placeholder="Digite o ingrediente"
                        placeholderTextColor={'#F3F3FF'}
                        value={nomeIng}
                        onChangeText={(value) => setNomeIng(value)}
                        style={styles.input}/>
                <Text style={styles.subtitle}>Unidade de Medida</Text>
                <RadioButtonGroup
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground="black">
                        <RadioButtonItem value='1' label={<Text style={styles.textRadio}> Kilos (Kg)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='2' label={<Text style={styles.textRadio}> Gramas (g)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='3' label={<Text style={styles.textRadio}> Litros (Lt)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='4' label={<Text style={styles.textRadio}> Mililitros (Ml)</Text>} style={styles.radio}/>
                        <RadioButtonItem value='5' label={<Text style={styles.textRadio}> Unidade (Un)</Text>} style={styles.radio}/>
                </RadioButtonGroup>
                <Text style={styles.subtitle}>Preço do produto</Text>
                    <NumericInput 
                        value={precoIng} onChange={value => setPrecoIng(value)}
                        rounded valueType='real'
                        totalWidth={170} totalHeight={50}
                        textColor={'white'} borderColor={'#F3F3FF'} rightButtonBackgroundColor={'#F3F3FF'} leftButtonBackgroundColor={'#F3F3FF'}/>
                <Text style={styles.subtitle}>Tamanho do produto</Text>
                <Text style={styles.rodape}>** Cadastre o peso/litragem/unidade do produto. Ex: Para uma barra de chocolate de 2Kg, cadastre 2 no campo abaixo e selecione Kg em Unidade de Medida.</Text>
                <NumericInput 
                        value={tamProdBruto} onChange={value => setTamProdBruto(value)}
                        rounded 
                        totalWidth={170} totalHeight={50}
                        textColor={'white'} borderColor={'#F3F3FF'} rightButtonBackgroundColor={'#F3F3FF'} leftButtonBackgroundColor={'#F3F3FF'}/>
                {/* <Text style={styles.subtitle}>Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.</Text> */}
                </ScrollView>
            </animatable.View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(24,24,24,0.6)',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    content:{
        backgroundColor:'#E06F72',
        height:'85%',
        width:'100%',
        borderRadius:24,
        paddingStart:'5%',
        paddingEnd:'5%',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#FFF',
        marginLeft:'1%',
        marginTop:'3%'
    },
    subtitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#F3F3FF',
        marginTop:'5%',
        marginBottom:'2%'  
    },
    input:{
        color:'#F3F3FF',
        borderBottomWidth:1,
        height:40,
        fontSize:14,
        borderBottomColor:'#DADADA'
    },
    backButton:{
        marginTop:'3%',
        marginRight:'1%',
    },
    headerModal:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    underline: {
        textDecorationLine: 'underline'
    },

    radio:{
        borderColor:'#FFF',
        marginTop:1,
    },
    textRadio:{
        color:'#FFF', 
        fontWeight:'bold'
    },
    rodape:{
        fontSize: 10,
        color:'#FFF',
        marginBottom:10
    },

})
