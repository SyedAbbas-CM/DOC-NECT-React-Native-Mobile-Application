import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
//screens for stack
import SigninScreen from  '../screens/SigninScreen'
import Register from  '../screens/RegisterScreen'
import HomeScreen  from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import CertificationScreen from '../screens/CertificationScreen';
import PolicyScreen from '../screens/PolicyScreen/PolicyScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const screens = {
    SignIn : SigninScreen,
    Registration : Register,
    HomeScreen : HomeScreen,
    Profile : ProfileScreen,
    MedicalHistory: MedicalHistoryScreen,
    Certification : CertificationScreen,
    Policy: PolicyScreen,
    Settings: SettingsScreen
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{contentStyle : { backgroundColor : "#ffffff" }}}>        
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