import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//screens for stack
import SigninScreen from  '../screens/SigninScreen'
import Register from  '../screens/RegisterScreen'
import HomeScreen  from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const screens = {
    Signin : SigninScreen,
    Registration : Register,
    HomeScreen : HomeScreen,
    Profile : ProfileScreen,
    MedicalHistory: MedicalHistoryScreen,
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{contentStyle : { backgroundColor : "#ffffff" }, headerShown:false}}>        
        {
          Object.keys(screens).map((key, index) => 
                <Stack.Screen name = {key} key={index} component={screens[key]}/>
          )
        }
      </Stack.Navigator>      
    </NavigationContainer>
  )
}

export default Navigation