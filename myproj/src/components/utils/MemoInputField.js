import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useFormikContext } from "formik";


export const MemoInputComponent = React.memo(({name, label, disabled, props}) => {
    const {values, setFieldValue } = useFormikContext();
    
    return(<TextInput style={{ ...styles.input }}
        onChangeText={(value) => setFieldValue(name, value)}
        value={values ? values[name] : label}
        editable={disabled == 1 ? true : false}
        label= {label}
        mode="outlined"
        disabled={disabled == true ? false : true}
        
    ></TextInput>);
}, (prevProps, nextProps) => prevProps.name === nextProps.name);


const styles = StyleSheet.create({
    input: {
        includeFontPadding: false,
        padding: 0,
        margin: 0,
        backgroundColor: "white",
        color: 'gray'
    },
    multiline_input: {
        height: 150,
        maxHeight: 180,
        backgroundColor: "white",
        color: 'gray'
    },
})
