import { View, Text,TextInput,StyleSheet, useColorScheme } from 'react-native'
import React from 'react'

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
  return (
    <View>
      <TextInput 
      value = {value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={styles.input} 
      secureTextEntry={secureTextEntry}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {

    width:'50%',
    borderWidth:1,
    borderColor:'#444',
    backgroundColor: '#fff',
    borderRadius:10,
    color:'black',
    marginVertical:5,
    paddingHorizontal:10,
    },
  });

export default CustomInput