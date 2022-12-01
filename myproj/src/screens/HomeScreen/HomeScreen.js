import { View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {Array.from({ length: 20 }, (item, i) => <Text style={{ marginVertical: 10 }}>Hi {i}</Text>)}
        </ScrollView>
        {/* <Footer /> */}
      </View>
    </>
    // <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
    //   <Text>DOCNET HOME SCREEN</Text>
    //   <Button  
    //       style={{margin:10}}
    //       mode="contained" 
    //       onPress={() => navigation.navigate("Profile")}
    //       buttonColor="#3796f3">
    //       Profile
    //   </Button>
    //   <Button  
    //       style={{margin:10}}
    //       mode="contained" 
    //       onPress={() => navigation.navigate("Policy")}
    //       buttonColor="#3796f3">
    //       Policy
    //   </Button>
    //   <Button  
    //       style={{margin:10}}
    //       mode="contained" 
    //       onPress={() => navigation.navigate("Settings")}
    //       buttonColor="#3796f3">
    //       Settings
    //   </Button>
    // </View>
  );
};


export default HomeScreen;
