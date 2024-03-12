import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import FlashMessage from 'react-native-flash-message';


export default function Routes(){
    return(
            <NavigationContainer>
                <StackRoutes/>
                <FlashMessage  
                    position={'bottom'}/>
            </NavigationContainer>
    )
}