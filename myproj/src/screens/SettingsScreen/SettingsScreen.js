import { View, ScrollView, StyleSheet} from 'react-native'
import React , {useState, useCallback} from 'react'
import { Icon, Text, Button, Title, Paragraph} from 'react-native-paper';

const SettingsScreen = () => {
    return ( 
        <View></View>
     );
}
 
export default SettingsScreen;

const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop: 6
    },
    input : {
      marginVertical:10, 
      backgroundColor : "white",
      color : 'gray'
    },
    button : {
      marginVertical:10,
      borderRadius: 5
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    fab: {
      position: 'absolute',
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      left: 0,
      top: 0,
      zIndex: 99
  },
  })