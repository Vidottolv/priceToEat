import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons'


export function ModalCadastroReceita({ handleClose }){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerModal}>
                    <Text style={[styles.title, styles.underline]}>Cadastrar Receita</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleClose}>
                        <Ionicons
                            size={30} 
                            color={'#FFF'}
                            name='close-circle-outline'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        height:'80%',
        width:'90%',
        borderRadius:24
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'#FFF',
        marginLeft:'7%',
        marginTop:'3%'
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
