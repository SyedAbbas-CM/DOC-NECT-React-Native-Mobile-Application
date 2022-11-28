import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, WrapWithKeyboardDismiss } from '../../global';

import RegisterUser from '../../components/RegisterUser';
import RegisterSelect from '../../components/RegisterSelect';
import axios from 'axios';
import { CertificationForm } from '../../components/CertificationForm';
import { Alert } from 'react-native';
import { SERVER_IP, SERVER_PORT } from '../../../config';

const Register = () => {
  const navigation = useNavigation();
  const [choice, setchoice] = useState(null);
  const [showCertifForm, setshowCertifForm] = useState(false);

  const onRegisterUser = (formData) => {
    console.log(formData);
    axios.post(
      `http://${SERVER_IP}:${SERVER_PORT}/api/register`,
      {
        userName: formData.userName,
        firstName: formData.firstName,
        userRole: "USER",
        lastName: formData.lastName,
        email: formData.email,
        dob: formData.dob,
        pass: formData.password
      },
      {timeout : 5000})
      .then(response => {
        if (choice === "doctor") setshowCertifForm(true);
        else {
          navigation.navigate("Signin");
        }
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
  const onSubmitCertificationForm = (formData) => {
    // axios.post().then(
    // if( successful)
    //   navigation.navigate("HomeScreen");
    // )
    // console.log(formData);
  }

  return (
    choice === null ?
      <RegisterSelect onSelect={(ch) => setchoice(ch)} />
      :
      !showCertifForm ?
        <RegisterUser results={onRegisterUser} />
        :
        <CertificationForm results={onSubmitCertificationForm} />
  );
};

export default WrapWithKeyboardDismiss(Register);



//rnfe 