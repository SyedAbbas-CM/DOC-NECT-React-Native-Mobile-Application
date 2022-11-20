import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//screens for stack
import SigninScreen from  '../screens/SigninScreen'
import Register from  '../screens/RegisterScreen'
import HomeScreen  from '../screens/HomeScreen';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
const Stack = createNativeStackNavigator();


const WrapWithKeyboardDismiss = (component) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {component()}
    </TouchableWithoutFeedback>
  );
}

const Navigation = () => {

  const screens = {
    Signin : () => WrapWithKeyboardDismiss(SigninScreen),
    Registration : () => WrapWithKeyboardDismiss(Register),
    HomeScreen : () => WrapWithKeyboardDismiss(HomeScreen)
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{contentStyle : { backgroundColor : "#ffffff" }, headerShown:false}}>        
        {
          Object.keys(screens).map((key, index) => {
            return (
                <Stack.Screen name = {key} key={index}>
                  {screens[key]}
                </Stack.Screen>
              )
          })
        }
      </Stack.Navigator>      
    </NavigationContainer>
  )
}

export default Navigation