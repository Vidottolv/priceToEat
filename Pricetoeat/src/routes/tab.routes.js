import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'
import { CadastroBase } from "../pages/cadastros/cadastroBase";
import ProdutosSelecionados  from "../pages/cadastros/cadastroBase/produtosSelecionados";

const Tab = createBottomTabNavigator();

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
