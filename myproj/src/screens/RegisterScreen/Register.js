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
        navigation.navigate('HomeScreen');
    // )
  }
  const onSubmitCertificationForm = (formData) => {
    // axios.post().then(
      navigation.navigate('HomeScreen');
    // )
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