import { StyleSheet, View, Image, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'

import { Text, TextInput, Button } from 'react-native-paper';
import heartBeat from '../../../assets/logo.png';


const SigninScreen = () => {

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [username,setusername] = useState('');
  const [password,setpassword] = useState('');

  const onSignIn = () => {
    console.warn('Sign in');
    //validate user  
    navigation.navigate('HomeScreen');
  }

  const onForgetPassword = () => {

  }
  const onRegister = () => {
    navigation.navigate('Registration');
  }

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Image 
          source={heartBeat}
          resizeMode="contain"
          style = {[styles.logo, {height : height * 0.3}]}
        />

        <Text 
          variant="displayMedium"
          style={{textAlign : "center", marginBottom: 30, fontWeight : 'bold'}}>
          DocNet
        </Text>

        <TextInput     
          left= {<TextInput.Icon icon="account"/>} 
          label="Email"
          value={username}
          onChangeText={text => setusername(text)}
          style = {styles.input}
          mode = "outlined"
          outlineColor="#c4c4c4"
          activeOutlineColor="#3796f3"
        />

        <TextInput      
          left = {<TextInput.Icon icon="lock"/>}
          label="Password"
          value={password}
          onChangeText={text => setpassword(text)}
          style = {styles.input}        
          mode = "outlined"
          outlineColor="#c4c4c4"
          activeOutlineColor="#3796f3"
        />
        <Button  
          mode="contained" 
          onPress={onSignIn}
          style= {styles.button}
          buttonColor="#3796f3">
          Sign in
        </Button>

        <Button  
          mode="outlined" 
          onPress={onForgetPassword}
          style= {styles.button}
          buttonColor="transparent"
          textColor="gray">
          Forgot Password?
        </Button>    

        <Button  
          mode="contained" 
          onPress={onRegister}
          style= {styles.button}
          buttonColor="transparent"
          textColor="gray">
          Dont have an account? Register here.
        </Button>
      </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root : {
    padding : 20,
    marginBottom : 'auto',
    marginTop : 'auto'
  },
  logo : {
    marginLeft : 'auto',
    marginRight : 'auto',
    width : '70%',
    maxWidth : 300,
    maxHeight : 200
  },
  input : {
    marginVertical:10, 
    backgroundColor : "white"
  },
  button : {
    marginVertical:10,
    borderRadius: 5
  }
})

export default SigninScreen ;



//rnfe 