//starter stuff
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//other functionality
import {useState,useEffect} from "react";
import axios from "axios";

//main entry point for front end
import Navigation from './src/Navigation';
import RegisterScreen from './src/screens/RegisterScreen';
import SigninScreen from './src/screens/SigninScreen';

//main app
export default function App() {
  const [somestate,somesetstate] = useState([])
  
 
  
  
  return (
    <View style={styles.container}>

      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#000',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
