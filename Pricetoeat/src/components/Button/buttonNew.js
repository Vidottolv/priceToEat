import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"


export default function ButtonNew({size}) {
    return(
        <View style={styles.container}>
            <Entypo name="plus" size={size}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:55,
        height:55,
        borderRadius:30,
        borderWidth:3,
        borderColor:'#FFF',
        backgroundColor:'#99BC85',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        marginBottom:50,
    }
})