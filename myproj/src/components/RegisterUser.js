import * as yup from 'yup';
import { Formik } from 'formik';
import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { globalStyles } from '../global';
import userAvatar from '../../assets/user-avatar.png';

const RegisterUser = ({ results }) => {
    const schema = yup.object({
        userName: yup.string().min(3, "The minimum length is 3.").required("Required"),
        firstName: yup.string().min(3, "The minimum length is 3.").required("Required"),
        lastName: yup.string().min(3, "The minimum length is 3.").required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        dob: yup.string().required("Required"),
        password: yup.string().min(4, "The minimum length is 4.").required("Required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Required")
    });
    const labels = ["Username", "First name", "Last name", "Email", "Date of birth", "Password", "Confirm Password"];
    return (
        <ScrollView>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
                    userName: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={schema}
                onSubmit={(values) => results(values)}
                >
                {({ handleChange, handleSubmit, values, errors}) => (
                    <View style={globalStyles.root}>
                        {
                            Object.keys(values).map( (key, i) => 
                                <View key={i}>
                                    <TextInput
                                        label={labels[i]}
                                        onChangeText = {handleChange(key)}
                                        value={values[key]}
                                        style={globalStyles.input}
                                        mode="outlined"
                                        outlineColor="#c4c4c4"
                                        activeOutlineColor="#3796f3"
                                        secureTextEntry = {key === "password" || key === "passwordConfirm"}
                                    />
                                    <HelperText 
                                        type="error"
                                        visible={() => errors[key] != ""}>
                                        {errors[key]}
                                    </HelperText>
                                </View> )
                        }

                        <Text 
                            variant='bodyMedium'
                            style={{textAlign : "center"}}
                        >
                            By registering, you agree to
                            <Text 
                                style={{textDecorationLine : "underline", fontWeight : "bold"}}
                                onPress ={() => console.log("Hellooo")}
                            > 
                                &nbsp;Docnet's terms and conditions.
                            </Text>
                        </Text>

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={globalStyles.button}
                            buttonColor="#3796f3">
                            Register
                        </Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};
export default RegisterUser;