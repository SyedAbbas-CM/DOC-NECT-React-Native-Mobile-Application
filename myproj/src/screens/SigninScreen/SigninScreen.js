import { StyleSheet, View, Image, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { Text, TextInput, Button } from 'react-native-paper';
import { WrapWithKeyboardDismiss } from '../../global';
import heartBeat from '../../../assets/logo.png';
import axios from "axios"


const SigninScreen = () => {

  const { height } = useWindowDimensions();
  const navigation = useNavigation();


  const [form, setform] = useState({
    email : "",
    password : "",
  });


  const updateForm = (field, value) => {
    const newForm = {...form};
    newForm[field] = value;
    setform(newForm);
  }

  const onSignIn = () => {
   // console.warn('Signing in');
    axios.post("http://192.168.1.38:8090/api/signin",{
      email:form.email,
      pass:form.password
    }).then((response)=>{
      //console.log(response);
      if(response.status === 200)
      navigation.navigate('HomeScreen');
      else{
        console.warn("Invalid Email / password"+response.status)
      }  
    }

      ).catch(function (error){
      if (error.response) {
        
      //console.log(error.response.data);
       //console.log("Error: "+error.response.status);
      //console.log(error.response.headers);

      }else if (error.request) {
      //console.log("No Response: "+error.request);
      }else {
        //console.log('Error sending request!', error.message);
      }
});
  }

  const onForgetPassword = () => {
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
          left= {<TextInput.Icon icon="email"/>} 
          label="Email"
          value={form.email}
          onChangeText={text => updateForm("email", text)}
          style = {styles.input}
          mode = "outlined"
          outlineColor="#c4c4c4"
          activeOutlineColor="#3796f3"
        />

        <TextInput      
          left = {<TextInput.Icon icon="lock"/>}
          label="Password"
          value={form.password}
          onChangeText={text => updateForm("password", text)}
          style = {styles.input}        
          mode = "outlined"
          outlineColor="#c4c4c4"
          activeOutlineColor="#3796f3"
          secureTextEntry
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
          onPress={() => navigation.navigate("Registration")}
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
    backgroundColor : "white",
    color : 'gray'
  },
  button : {
    marginVertical:10,
    borderRadius: 5
  }
})

export default WrapWithKeyboardDismiss(SigninScreen);



//rnfe 