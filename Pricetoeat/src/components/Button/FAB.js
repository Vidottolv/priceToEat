import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useFonts } from "expo-font";

export default function FAB() {
  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const actions = [
    {
      text: "Adicionar Base",
      color:'#99BC85',
      buttonSize:50,
      margin:5,
      icon: <Ionicons name="fast-food-outline" size={25}/>,
      name: "cadastroBase",
      position: 2
    },
    {
      text: "Adicionar Produto",
      color:'#99BC85',          
      buttonSize:50,
      margin:5,
      icon: <Ionicons name="basket-outline" size={25}/>,
      name: "cadastroProduto",
      position: 1
    },
    {
      text: "Adicionar Receita",
      color:'#99BC85',
      fontFamily:'Quicksand-Regular',          
      buttonSize:50,
      margin:5,
      icon: <Ionicons name="restaurant-outline" size={25}/>,
      name: "firstSteps",
      position: 3
    },
    {
      text: "Configurações",
      color:'#99BC85',          
      buttonSize:50,
      margin:5,
      icon: <Ionicons name="settings" size={25}/>,
      name: "nomearReceita",
      position: 4
    }
    ];
    const navigation = useNavigation();
    
    return (
      <FloatingAction
        actions={actions} 
        style={{fontFamily:'Quicksand-Regular'}}
        color="#99BC85"
        distanceToEdge={20}
        buttonSize={60}
        overlayColor="rgba(225,240,218,0.3)"
        onPressItem={name => {
          navigation.navigate(name)
      }}/>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
});