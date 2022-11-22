import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React ,{useState} from 'react'

const ActivityView = () => {
    return ( 
        <View style = {styles.root}>
        </View>
     );
}
 
export default ActivityView;


const styles = StyleSheet.create({
    root : {
      flex:1,
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    }
})