import Signin from '../pages/signin';
import Welcome from '../pages/welcome'
import TabRoutes from './tab.routes';
import CadastroUsuario from '../pages/cadastroUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroProduto from '../pages/cadastros/cadastroProduto';
import {CadastroBase} from '../pages/cadastros/cadastroBase';
import CadastroReceita from '../pages/cadastros/cadastroReceita';
import {ConsultaProduto} from '../pages/consultas/produto';

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
            component={TabRoutes}
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
            component={CadastroBase}
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
            name="consultaProduto"
            component={ConsultaProduto}
            options={{
                headerShown:false,
            }}
            />
        </Stack.Navigator>
    )
}
