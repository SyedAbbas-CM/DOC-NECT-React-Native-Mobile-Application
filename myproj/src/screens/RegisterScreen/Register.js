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
    axios.post(
        "http://192.168.1.38:8090/api/register",
        {
          uname:formData.userName,   
          fname:formData.firstName,
          role:"user",
          lname:formData.lastName,
          email:formData.email,
          dob:formData.dob,
          pass:formData.password
        })
        .then( response => {
          if(response.status === 200){
            /*To do: Store the api key */
            if(choice === "doctor") setshowCertifForm(true);
            else{
              navigation.navigate("HomeScreen");
            }
          }
        })
        .catch( error => console.warn(error));        

  }
  const onSubmitCertificationForm = (formData) => {
    // axios.post().then(
      // if( successful)
    //   navigation.navigate("HomeScreen");
    // )
    // console.log(formData);
  }
  return (
    // choice === null ?
      // <RegisterSelect onSelect = {(ch)=> setchoice(ch)}/>
      //               :
      // !showCertifForm ? 
      //   <RegisterUser results={onRegisterUser}/>
      //                 :
        <CertificationForm results={onSubmitCertificationForm}/>
  );
};

export default WrapWithKeyboardDismiss(Register);



//rnfe 