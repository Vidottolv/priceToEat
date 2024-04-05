import Signin from '../pages/signin';
import Welcome from '../pages/welcome'
import { TabBases } from './tab.routes';
import CadastroUsuario from '../pages/cadastroUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroProduto from '../pages/cadastros/cadastroProduto';
import CadastroReceita from '../pages/cadastros/cadastroReceita';
import { Cadastros } from '../pages/home/cadastros';
import { NomearReceita } from '../components/receita';
import EditarProdutoScreen from '../pages/edicoes/editaProduto';
import EditarReceitaScreen from '../pages/edicoes/editaReceita';

const Stack = createNativeStackNavigator();

export function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="signin"
            component={Signin}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="home"
            component={Cadastros}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="cadastroUsuario"
            component={CadastroUsuario}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="cadastroProduto"
            component={CadastroProduto}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="cadastroBase"
            component={TabBases}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="cadastroReceita"
            component={CadastroReceita}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="nomearReceita"
            component={NomearReceita}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="editaProduto"
            component={EditarProdutoScreen}
            options={{
                headerShown:false,
            }}
            />
            <Stack.Screen
            name="editaReceita"
            component={EditarReceitaScreen}
            options={{
                headerShown:false,
            }}
            />
        </Stack.Navigator>
    )
}
