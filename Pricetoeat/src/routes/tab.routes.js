import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Cadastros} from '../pages/home/cadastros'
import {Ionicons, Entypo} from '@expo/vector-icons'
import { CadastroBase } from "../pages/cadastros/cadastroBase";
import ProdutosSelecionados  from "../pages/cadastros/cadastroBase/produtosSelecionados";
import CadastroProduto from "../pages/cadastros/cadastroProduto";
import ButtonNew from "../components/Button/buttonNew";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

// export function TabRoutes(){
//     return(
//         <Tab.Navigator>
//             <Tab.Screen
//             name='Cadastros'
//             component={Cadastros}
//             options={{
//                 headerStyle: { backgroundColor:'#FFF' },
//                 tabBarStyle:{ 
//                     position:'absolute',
//                     justifyContent:'center',
//                     backgroundColor:'#BFD8AF',
//                     bottom:20,
//                     elevation:0,
//                     borderRadius:45,
//                     height:45,
//                     width:'85%',
//                     marginLeft:'7.5%',
//                     marginRight:'7.5%'
//                 },
//                 tabBarShowLabel:false,
//                 headerShown:false,
//                 headerTitleStyle:{ color:'#000' },
//                 tabBarIcon: ({ focused }) => {
//                     if( focused ){
//                         return <Ionicons 
//                                 size={25} 
//                                 color={'#000'} 
//                                 name="home-outline"/>
//                     }return <Ionicons 
//                             size={25}
//                             color={'#000'} 
//                             name="home-outline"/>},
//             }}/>
//             {/* <Tab.Screen
//             name='CadastroProduto'
//             component={CadastroProduto}
//             options={{
//                 headerStyle: { backgroundColor:'#FFF'},
//                 headerShown:false,
//                 headerTitleStyle: {
//                     color:'#dadada',
//                     fontSize:40
//                 },
//                 tabBarStyle:{ 
//                     position:'absolute',
//                     justifyContent:'center',
//                     backgroundColor:'#BFD8AF',
//                     bottom:20,
//                     elevation:0,
//                     borderRadius:45,
//                     height:45,
//                     width:'85%',
//                     marginLeft:'7.5%',
//                     marginRight:'7.5%'
//                 },
//                 tabBarShowLabel:false,
//                 headerTitleStyle:{ color:'#000' },
//                 tabBarIcon: ({size})=> (
//                    <ButtonNew name="plus" size={size}/> 
//                 )
//             }}/> */}
//             <Tab.Screen
//             name='Consultas'
//             component={Consultas}
//             options={{
//                 headerStyle: { backgroundColor:'#FFF' },
//                 tabBarStyle:{ 
//                     position:'absolute',
//                     justifyContent:'center',
//                     backgroundColor:'#99BC85',
//                     bottom:20,
//                     elevation:0,
//                     borderRadius:45,
//                     height:45,
//                     width:'85%',
//                     marginLeft:'7.5%',
//                     marginRight:'7.5%'
//                 },
//                 tabBarShowLabel:false,
//                 headerTitleStyle:{ color:'#000' },
//                 tabBarIcon: ({ focused }) => {
//                     if( focused ){
//                         return <Ionicons size={25}
//                                 color={'#000'} 
//                                 name="book-outline"/>
//                     }return <Ionicons size={25} 
//                             color={'#000'} 
//                             name="book-outline"/>},
//                 }}/>
//         </Tab.Navigator>
//     )
// }

export function TabBases(){
    return(
         <Tab.Navigator>
            <Tab.Screen
            name='Produtos'
            component={CadastroBase}
            options={{
                headerStyle: { backgroundColor:'#FFF' },
                tabBarStyle:{ backgroundColor:'#FFF' },
                tabBarShowLabel:false,
                headerShown:false,
                headerTitleStyle:{ color:'#000' },
                tabBarIcon: ({ focused }) => {
                    if( focused ){
                        return <Ionicons 
                                size={25} 
                                color={'#000'} 
                                name="albums-outline"/>
                    }return <Ionicons 
                            size={25} 
                            color={'#DADADA'} 
                            name="albums-outline"/>},
            }}/>
            <Tab.Screen
            name='Selecionados'
            component={ProdutosSelecionados}
            options={{
                headerStyle: { backgroundColor:'#FFF' },
                tabBarStyle: { backgroundColor:'#FFF' },
                tabBarShowLabel:false,
                headerShown:false,
                headerTitleStyle:{ color:'#000' },
                tabBarIcon: ({ focused }) => {
                    if( focused ){
                        return <Ionicons size={25}
                                color={'#000'} 
                                name="checkbox-outline"/>
                    }return <Ionicons size={25} 
                            color={'#DADADA'} 
                            name="checkbox-outline"/>},
                }}/>
        </Tab.Navigator>
    )
}
