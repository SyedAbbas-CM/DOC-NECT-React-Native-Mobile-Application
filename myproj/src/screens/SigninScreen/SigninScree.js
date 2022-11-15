import { View, Text ,Image,StyleSheet, ImageBackground} from 'react-native'
import Logo from '../../../assets/MEDIC.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react'





const SigninScreen = () => {


  const navigation = useNavigation();
  const[username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const onSigninPressed=()=>{
    console.warn('Sign in');
    //validate user
  
    navigation.navigate('HomeScreen');
  }
  const onRegisterPressed=()=>{
    console.warn('Log in');
    navigation.navigate('Registration');
  }


  return (
    <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>

          
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>DOCNET LOGIN SCREEN</Text> 
      <CustomInput placeholder="Username " value ={username} setValue={setUsername} />
      <CustomInput placeholder="Paassword" value ={password} setValue={setPassword} secureTextEntry/>
      <CustomButton text="Sign in" onPress={onSigninPressed}/>
      <CustomButton text="Register" onPress={onRegisterPressed} />
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: -400,
    bottom:0,
    left: 0,
    right:0, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: null,
    height: null,
    resizeMode: 'contain'
    
  },
  root:{
    allignItems:'center',
    top: 0,
    padding:20,
    bottom: 0,
    left: 0,
    right: 0, 

  },
  text:{
    color:'white',
  }
})



export default SigninScreen ;



//rnfe 