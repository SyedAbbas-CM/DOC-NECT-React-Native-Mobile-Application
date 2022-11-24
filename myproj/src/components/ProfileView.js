import React, { useState } from 'react';
import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from 'react-native'
import { Text, TextInput, Button, Title, Paragraph} from 'react-native-paper';

const ProfileView = ({editMode}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [about, setAbout] = useState('')

    return (  
        <ScrollView>
        <View style = {styles.root}>
            <View style={{...styles.row, flexDirection:"row", width:'100%'}}>
                <View style={{width:'50%', paddingRight: 10}}>
                    <TextInput style={{...styles.input}}
                        editable = {editMode == 1 ? true : false}
                        label = "Firstname"
                        mode = "outlined"
                        disabled = {editMode == true ? false : true}
                    ></TextInput>
                </View>
                <View style={{width:'50%', paddingLeft: 10}}>
                    <TextInput style={{...styles.input}}
                        editable = {editMode == 1 ? true : false}
                        label = "Lastname"
                        mode = "outlined"
                        disabled = {editMode == true ? false : true}
                    ></TextInput>
                </View>
            </View>

            <View style={{...styles.row}}>
                <TextInput style={{...styles.input}}
                    editable = {editMode == 1 ? true : false}
                    label = "Email"
                    mode = "outlined"
                    disabled = {editMode == true ? false : true}
                ></TextInput>
            </View>

            <View style={{...styles.row, flexDirection:"row", width:'100%'}}>
                <View style={{width:'42%', marginRight: '8%'}}>
                    <TextInput style={{...styles.input}}
                        editable = {editMode == 1 ? true : false}
                        label = "Age"
                        mode = "outlined"
                        disabled = {editMode == true ? false : true}
                    ></TextInput>
                </View>

                <View style={{width:'42%', marginLeft: '8%'}}>
                    <TextInput style={{...styles.input}}
                        editable = {editMode == 1 ? true : false}
                        label = "Gender"
                        mode = "outlined"
                        disabled = {editMode == true ? false : true}
                    ></TextInput>
                </View>
            </View>

            <View style={{...styles.row, flexDirection:"row", width:'100%'}}>
                <View style={{width:'42%', marginRight: '8%'}}>
                        <TextInput style={{...styles.input}}
                            editable = {editMode == 1 ? true : false}
                            label="D.O.B"
                            mode = "outlined"
                            disabled = {editMode == true ? false : true}
                        ></TextInput>
                </View>

                <View style={{width:'42%', marginLeft: '8%'}}>
                    <TextInput style={{...styles.input}}
                        editable = {editMode == 1 ? true : false}
                        label="City"
                        mode="outlined"
                        disabled = {editMode == true ? false : true}
                    ></TextInput>
                </View>
            </View>

            <View style={{...styles.row}}>
                <Text variant='bodyLarge' style={{color: editMode? "black" : "grey"}}>About Me</Text>
                {console.log(editMode)}
                <TextInput style={{...styles.multiline_input}}
                    editable = {editMode == 1 ? true : false}
                    multiline
                    mode = "outlined"
                    numberOfLines={4}
                    disabled = {editMode == true ? false : true}
                   
                ></TextInput>
            </View>
        </View>
        </ScrollView>
    );
}
 
export default React.memo(ProfileView);


const styles = StyleSheet.create({
    root : {
      flex:1,
      paddingTop: 10,
      paddingBottom: 70,
      paddingRight: 25,
      paddingLeft: 25
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    row : {
        paddingTop: 12,
        paddingBottom: 12
    },
    input : {
        includeFontPadding:false,
        padding:0,
        margin:0,
        backgroundColor : "white",
        color : 'gray'
    },
    multiline_input : {
        height: 150,
        maxHeight: 180,
        backgroundColor : "white",
        color : 'gray'
    },
})