import { View, Text ,Image,StyleSheet, ImageBackground} from 'react-native'
import Logo from '../../../assets/MEDIC.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import axios from "axios";
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
let usernameinput
let userpassinput

// We need to apply basic input validation here like email msut have @etc.com and password len > 5 etc
//backend validation wont happen here

const SigninScree = () => {
  const navigation = useNavigation();
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const[emailR,setEmailR] = useState('');
  const [password,setPassword] = useState('');
  const [passwordR,setPasswordR] = useState('');
  
  const onRegisterPressed=()=>{
    console.warn('Registering');
    axios.post("http://192.168.100.119:8090/login",{
      username:usernameinput,
      userpass:userpassinput
    })
    navigation.navigate('Signin');
  }
  



  usernameinput=username;
  userpassinput=password;
  return (
    <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.title}>Create an Account</Text>
     

      <CustomInput placeholder="Username                                                   " value ={username} setValue={setUsername} secureTextEntry = {false} />
      <CustomInput placeholder="Email                                                  " value ={email} setValue={setEmail} secureTextEntry = {false}/>
      <CustomInput placeholder="Confirm Email                                                  " value ={emailR} setValue={setEmailR} secureTextEntry = {false}/>
      <CustomInput placeholder="Paassword                                                    " value ={password} setValue={setPassword} userpass={setPassword} secureTextEntry/>
      <CustomInput placeholder="Confirm Paassword                                                    " value ={passwordR} setValue={setPasswordR} secureTextEntry/>
      <CustomButton text="Register" onPress={onRegisterPressed} />
      <Text style = {styles.text}>By registering, you confirm that you accept our terms and conditions</Text>
    </View>
  );
};
const styles = StyleSheet.create({

  root:{
    allignItems:'center',
    top: 0,
    padding:20,
    bottom: 0,
    left: 0,
    right: 0, 
    color:'white',
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'#0516C0',
  },
  text:{
    color:'white',

  }
})



export default SigninScree ;



//rnfe 