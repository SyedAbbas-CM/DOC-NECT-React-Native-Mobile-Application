import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, WrapWithKeyboardDismiss } from '../../global';
import RegisterUser from '../../components/RegisterUser';
import RegisterSelect from '../../components/RegisterSelect';
import axios from 'axios';
import { Alert } from 'react-native';
import { SERVER_IP, SERVER_PORT } from '../../../config';
import { authContext } from '../../context';
import { StackActions } from '@react-navigation/native';

const Register = () => {
  const { setAuth } = React.useContext(authContext);
  const navigation = useNavigation();
  const [choice, setchoice] = useState(null);

  const onRegisterUser = (formData) => {
    axios.post(
      `http://${SERVER_IP}:${SERVER_PORT}/api/register`,
      {
        userName: formData.userName.trim(),
        firstName: formData.firstName,
        userRole: "USER",
        lastName: formData.lastName,
        email: formData.email.trim(),
        dob: formData.dob,
        pass: formData.password
      },
      {timeout : 5000})
      .then(response => {
        setAuth({...response.data.data[0], accessToken : response.data.accessToken});
        if (choice === "doctor")          
          navigation.dispatch(
            StackActions.replace('Certification')
          );
        else 
          navigation.dispatch(
            StackActions.replace('HomeScreen')
          );
      })
      .catch(error => {
        if(error.response){
          switch(error.response.data.errorCode){
            case "auth/username-exists":
              Alert.alert("Registered username", "This username is already in use. Please use another username.");
              break;
            case "auth/email-exists":
              Alert.alert("Registered email", "This email is already in use. Please use another email.");
              break;
            default:
              Alert.alert("Invalid request.", "Your request could not be processed. Please try again later or contact support.");
              break;
          }
        }
        else{
          Alert.alert("404", "The server is irresponsive. Please try again later or contact support.");
        }
      });

  }
  return (
    choice === null ?    
      <RegisterSelect onSelect={(ch) => setchoice(ch)} />
      :
      // !showCertifForm ?
        <RegisterUser results={onRegisterUser} />
        // :
        // <CertificationForm results={onSubmitCertificationForm} />
  );
};

export default WrapWithKeyboardDismiss(Register);



//rnfe 