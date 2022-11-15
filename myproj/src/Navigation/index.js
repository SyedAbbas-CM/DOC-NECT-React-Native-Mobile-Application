import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//screens for stack
import SigninScreen from  '../screens/SigninScreen'
import Register from  '../screens/RegisterScreen'
import HomeScreen  from '../screens/HomeScreen';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name ="Signin" component={SigninScreen} />
        <Stack.Screen name ="Registration" component={Register} />
        <Stack.Screen name ="HomeScreen" component={HomeScreen} />

        </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default Navigation