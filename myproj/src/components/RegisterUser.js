import * as yup from 'yup';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native'
import React from 'react'
import { Text, TextInput, Button, HelperText, Checkbox } from 'react-native-paper';
import { globalStyles } from '../global';

const RegisterUser = ({ results }) => {
    const [agree, setagree] = React.useState(false);
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
                {({ handleChange, handleSubmit, values, errors }) => (
                    <View style={globalStyles.root}>
                        {
                            Object.keys(values).map((key, i) =>
                                <View key={i}>
                                    <TextInput
                                        label={labels[i]}
                                        onChangeText={handleChange(key)}
                                        value={values[key]}
                                        style={globalStyles.input}
                                        mode="outlined"
                                        outlineColor="#c4c4c4"
                                        activeOutlineColor="#3796f3"
                                        secureTextEntry={key === "password" || key === "passwordConfirm"}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={() => errors[key] != ""}>
                                        {errors[key]}
                                    </HelperText>
                                </View>)
                        }
                        <View style ={{display : "flex", flexDirection : "row", alignItems : "center"}}>
                            <Checkbox
                                status={agree ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setagree(!agree);
                                }}
                            />                            
                            <Text 
                                variant='bodyMedium'
                                style={{textAlign : "center"}}
                            >
                                I agree to
                                <Text 
                                    style={{color :"#3796f3", textDecorationLine : "underline", fontWeight : "bold"}}
                                    onPress ={() => console.log("Hello World from src/components/RegisterUser.js Line 73")}
                                > 
                                    &nbsp;Docnet's terms and conditions.
                                </Text>
                            </Text>
                        </View>

                        <Button
                            disabled={!agree}
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