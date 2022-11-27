import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, WrapWithKeyboardDismiss } from '../../global';

import RegisterUser from '../../components/RegisterUser';
import RegisterSelect from '../../components/RegisterSelect';
import axios from 'axios';
import { CertificationForm } from '../../components/CertificationForm';

const Register = () => {
  const navigation = useNavigation();
  const [choice, setchoice] = useState(null);
  const [showCertifForm, setshowCertifForm] = useState(false);

  const onRegisterUser = (formData) => {
    /* Post it? */
    // axios.post().then(
      if(choice === "doctor") setshowCertifForm(true);
      else 
    axios.post("http://192.168.1.38:8090/api/register",{
      uname:formData.userName,   
      fname:formData.firstName,
      role:"user",
      lname:formData.lastName,
      email:formData.email,
      dob:formData.dob,
      pass:formData.password
      }).then((response)=>{
      console.log(response);
      if(response.status === 200)
      navigation.navigate('Signin');
      else{
        console.warn(response)
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
  const onSubmitCertificationForm = (formData) => {

    



  }
  return (
    choice === null ?
      <RegisterSelect onSelect = {(ch)=> setchoice(ch)}/>
                    :
      !showCertifForm ? 
        <RegisterUser results={onRegisterUser}/>
                      :
        <CertificationForm results={onSubmitCertificationForm}/>
  );
};

export default WrapWithKeyboardDismiss(Register);



//rnfe 