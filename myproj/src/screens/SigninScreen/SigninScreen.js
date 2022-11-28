import { StyleSheet, View, Image, useWindowDimensions, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, Button } from 'react-native-paper';
import { globalStyles, WrapWithKeyboardDismiss } from '../../global';
import heartBeat from '../../../assets/logo.png';
import axios from "axios"
import SigninForm from '../../components/SigninForm';
import { SERVER_IP, SERVER_PORT } from '../../../config';

const SigninScreen = () => {

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignIn = (formData) => {
    axios.post(
      `http://${SERVER_IP}:${SERVER_PORT}/api/signIn`, 
      {
        userName : formData.userName,
        pass : formData.password
      }, 
      {timeout : 5000})
      .then( response => {
        const authObject = {...response.data.data[0], accessToken : response.data.accessToken};
        /* Save it globally  */
        navigation.navigate("HomeScreen");
      })
      .catch( error => {
        if(error.response){
          switch(error.response.data.errorCode){
            case "auth/invalid-username-password":
              Alert.alert("Invalid Credentials", "The username or email is incorrect.");
              break;
            default:
              Alert.alert("Invalid request.", "Your request could not be processed. Please try again later or contact support.");
              break;
          }
        }
        else 
          Alert.alert("404", "The server is irresponsive. Please try again later or contact support.");
      });
  }

  const onForgetPassword = () => {
  }

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={globalStyles.root}>
      <Image
        source={heartBeat}
        resizeMode="contain"
        style={[styles.logo, { height: height * 0.3 }]}
      />

      <Text
        variant="displayMedium"
        style={{ textAlign: "center", marginBottom: 30, fontWeight: 'bold' }}>
        DocNet
      </Text>

      <SigninForm results={onSignIn}/>
      <Button onPress={() => navigation.navigate("Profile")}>Go to profile</Button>
      <Button
        mode="outlined"
        onPress={onForgetPassword}
        style={globalStyles.button}
        buttonColor="transparent"
        textColor="gray">
        Forgot Password?
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Registration")}
        style={globalStyles.button}
        buttonColor="transparent"
        textColor="gray">
        Dont have an account? Register here.
      </Button>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  }
});

export default WrapWithKeyboardDismiss(SigninScreen);



//rnfe 