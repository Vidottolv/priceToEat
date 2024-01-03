import Signin from '../pages/signin';
import Welcome from '../pages/welcome'
import TabRoutes from './tab.routes';
import CadastroUsuario from '../pages/cadastroUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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

        </Stack.Navigator>
    )
}
