import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as animatable from 'react-native-animatable'



export function ModalCadastroReceita({ handleClose }){
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{flex:1, zIndex:9}}></TouchableOpacity>
            <animatable.View animation={'fadeInUpBig'} style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title, styles.underline]}>Cadastrar Receita</Text>
                        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
                            <Ionicons
                                size={30} 
                                color={'#FFF'}
                                name='close-circle-outline'/>
                        </TouchableOpacity>
                </View>
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
