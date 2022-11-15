import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress,text,type="PRIMARY"}) => {
  return (
    <Pressable onPress = {onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    container:{
      
        padding:15,
        margin:5,
        marginVertical:5,
        borderRadius:5,
        width:'100%'
    },
    container_PRIMARY:{
        backgroundColor:'#3B71F3',
    },
    container_TERTIARY:{

    },
    text_PRIMARY:{
        fontWeight:'bold',
        color:'white',
    },
    text_TERTIARY:{
        color:'grey',
    },

})
export default CustomButton