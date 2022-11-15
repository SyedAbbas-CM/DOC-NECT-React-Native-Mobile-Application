import { View, Text ,Image,StyleSheet, ImageBackground} from 'react-native'
import React ,{useState} from 'react'
import Logo from '../../../assets/MEDIC.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const Somebutton=()=>{
  console.warn('Sign in');
}
const Somebutton2=()=>{
  console.warn('Log in');
}

const HomeScreen = () => {
  const[username,setUsername] = useState('');
  const [password,setPassword] = useState('');
   //useEffect(()=>{
   // async function getallData(){
   //   try{
        
    //    const data = await axios.get("http://192.168.100.119:8090/stuff")//local ip added here so phone can access your express server
    //   console.log(data.data)
    //    somesetstate(data.data)
    //  }catch(error){console.log(error)}
  //  }
//  getallData();
// }
  
 // )


  return (
    <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>DOCNET HOME SCREEN</Text>
      <CustomButton text="HomeButton" onPress={Somebutton}/>
      <CustomButton text="HomeButton2" onPress={Somebutton2} />
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: -400,
    bottom:0,
    left: 0,
    right:0, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: null,
    height: null,
    resizeMode: 'contain'
    
  },
  root:{
    allignItems:'center',
    top: 0,
    padding:20,
    bottom: 0,
    left: 0,
    right: 0, 
    color:'white',
  }
})



export default HomeScreen ;



//rnfe 