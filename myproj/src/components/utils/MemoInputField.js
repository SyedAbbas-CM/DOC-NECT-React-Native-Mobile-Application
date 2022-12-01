import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useFormikContext } from "formik";


export const MemoInputComponent = React.memo(({name, label, disabled, textColor, styles, labeltextstyles}) => {
    const {values, setFieldValue } = useFormikContext();
    
    return(<TextInput style={{ ...styles }}
        onChangeText={(value) => setFieldValue(name, value)}
        value={values ? values[name] : label}
        editable={disabled == 1 ? true : false}
        label= {<Text style={labeltextstyles}>{label}</Text>}
        disabled={disabled == true ? false : true}
        textColor={textColor}
        
    ></TextInput>);
}, (prevProps, nextProps) => prevProps.name === nextProps.name);
