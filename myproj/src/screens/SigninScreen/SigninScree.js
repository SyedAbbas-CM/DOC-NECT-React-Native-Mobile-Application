import { View  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react'

import { Text, TextInput, Button } from 'react-native-paper';



const SigninScreen = () => {


  const navigation = useNavigation();
  const[username,setusername] = useState('');
  const [password,setpassword] = useState('');

  const onSigninPressed=()=>{
    console.warn('Sign in');
    //validate user  
    navigation.navigate('HomeScreen');
  }

  const onRegisterPressed=()=>{
    console.warn('Log in');
    navigation.navigate('Registration');
  }


  return (
    <View style={{marginTop : 'auto', marginBottom : 'auto'}}>
      <Text 
        variant="displayMedium"
        style={{textAlign : "center", marginBottom: 50}}>
        DocNet
      </Text>
      
      <TextInput      
        label="Email"
        value={username}
        onChangeText={text => setusername(text)}
        style = {{margin:10}}
        mode = "outlined"
        outlineColor="#c4c4c4"
        textColor= "blue"
        activeOutlineColor="#c4c4c4"
      />

      <TextInput      
        label="Password"
        value={password}
        onChangeText={text => setpassword(password)}
        style = {{margin:10}}        
        mode = "outlined"
        outlineColor="#c4c4c4"
      />
      <Button  
        mode="contained" 
        onPress={onSigninPressed}
        style= {{margin:10, borderRadius: 5}}
        buttonColor="#3796f3">
        Sign in
      </Button>
      <Button  
        mode="contained" 
        onPress={onRegisterPressed}
        style= {{margin:10, borderRadius: 5}}
        buttonColor="#3796f3">
        Register
      </Button>

    </View>
  );
};

export default SigninScreen ;



//rnfe 