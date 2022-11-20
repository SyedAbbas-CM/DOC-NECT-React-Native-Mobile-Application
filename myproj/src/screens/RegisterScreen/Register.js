import { View ,Image,StyleSheet, ImageBackground} from 'react-native'
import axios from "axios";
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, Button } from 'react-native-paper';
import { styles, WrapWithKeyboardDismiss } from '../../global';

import userAvatar from '../../../assets/user-avatar.png';

let usernameinput
let userpassinput

// We need to apply basic input validation here like email msut have @etc.com and password len > 5 etc
//backend validation wont happen here

const Register = () => {
  const navigation = useNavigation();
  const [form, setform] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    passwordConfirm : ""
  });
  
  const updateForm = (field, value) => {
    const newForm = {...form};
    newForm[field] = value;
    setform(newForm);
  }

  const onRegister = ()=>{
    console.warn('Registering');
    // axios.post("http://192.168.100.119:8090/login",{
    //   username:usernameinput,
    //   userpass:userpassinput
    // })
    navigation.navigate('Signin');
  }
  



  // usernameinput=username;
  // userpassinput=password;
  return (
    <View style = {styles.root}>
      <Text
          variant="displaySmall"
          style={{textAlign : "center", marginVertical: 30, fontWeight : 'bold'}}>
          Create an Account
      </Text>

      <Image source = {userAvatar} resizeMode = "contain"/>
      <TextInput     
        label="First name"
        value={form.firstName}
        onChangeText={text => updateForm("firstName", text)}
        style = {styles.input}
        mode = "outlined"
        outlineColor="#c4c4c4"
        activeOutlineColor="#3796f3"
      />

      <TextInput     
        label="Last name"
        value={form.lastName}
        onChangeText={text => updateForm("lastName", text)}
        style = {styles.input}
        mode = "outlined"
        outlineColor="#c4c4c4"
        activeOutlineColor="#3796f3"
      />

      <TextInput     
        label="Email"
        value={form.email}
        onChangeText={text => updateForm("email", text)}
        style = {styles.input}
        mode = "outlined"
        outlineColor="#c4c4c4"
        activeOutlineColor="#3796f3"
      />

      <TextInput     
        label="Password"
        value={form.password}
        onChangeText={text => updateForm("password", text)}
        style = {styles.input}
        mode = "outlined"
        outlineColor="#c4c4c4"
        activeOutlineColor="#3796f3"
        secureTextEntry
      />

      <TextInput     
        label="Confirm Password"
        value={form.passwordConfirm}
        onChangeText={text => updateForm("passwordConfirm", text)}
        style = {styles.input}
        mode = "outlined"
        outlineColor="#c4c4c4"
        activeOutlineColor="#3796f3"
        secureTextEntry
      />
        <Button  
          mode="contained" 
          onPress={onRegister}
          style= {styles.button}
          buttonColor="#3796f3">
          Register
        </Button>
      {/* <CustomInput placeholder="Username                                                   " value ={username} setValue={setUsername} secureTextEntry = {false} />
      <CustomInput placeholder="Email                                                  " value ={email} setValue={setEmail} secureTextEntry = {false}/>
      <CustomInput placeholder="Confirm Email                                                  " value ={emailR} setValue={setEmailR} secureTextEntry = {false}/>
      <CustomInput placeholder="Paassword                                                    " value ={password} setValue={setPassword} userpass={setPassword} secureTextEntry/>
      <CustomInput placeholder="Confirm Paassword                                                    " value ={passwordR} setValue={setPasswordR} secureTextEntry/>
      <CustomButton text="Register" onPress={onRegisterPressed} />
      <Text style = {styles.text}>By registering, you confirm that you accept our terms and conditions</Text> */}
    </View>
  );
};
// const styles = StyleSheet.create({

//   root:{
//     allignItems:'center',
//     top: 0,
//     padding:20,
//     bottom: 0,
//     left: 0,
//     right: 0, 
//     color:'white',
//   },
//   title:{
//     fontSize:24,
//     fontWeight:'bold',
//     color:'#0516C0',
//   },
//   text:{
//     color:'white',

//   }
// })



export default WrapWithKeyboardDismiss(Register);



//rnfe 