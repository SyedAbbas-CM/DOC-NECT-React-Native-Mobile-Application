import * as yup from 'yup';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native'
import React from 'react'
import { Text, TextInput, Button, HelperText, Checkbox } from 'react-native-paper';
import { globalStyles } from '../global';
import { DatePickerModal } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native';

const RegisterUser = ({ results }) => {
    const navigation = useNavigation();
    const [agree, setagree] = React.useState(false);
    const [dateOpen, setdateOpen] = React.useState(false);
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

    const onConfirmDatePicker = (params, setFieldValue) => {
        setFieldValue("dob", params.date.toISOString().split('T')[0]);
        setdateOpen(false);
    }

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
                onSubmit={(values) => {
                    const { confirmPassword, ...rest } = values;
                    results(rest);
                }}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
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
                                        onFocus={key === "dob" ? () => setdateOpen(true) : undefined}
                                        secureTextEntry={key === "password" || key === "confirmPassword"}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={() => errors[key] != ""}>
                                        {errors[key]}
                                    </HelperText>
                                </View>)
                        }
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Checkbox
                                status={agree ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setagree(!agree);
                                }}
                            />
                            <Text
                                variant='bodyMedium'
                                style={{ textAlign: "center" }}
                            >
                                I agree to
                                <Text
                                    style={{ color: "#3796f3", textDecorationLine: "underline", fontWeight: "bold" }}
                                    onPress={() => navigation.navigate("Policy")}
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

                        <DatePickerModal
                            locale="en"
                            mode="single"
                            visible={dateOpen}
                            date={new Date()}
                            onDismiss={() => setdateOpen(false)}
                            onConfirm={(params) => onConfirmDatePicker(params, setFieldValue)}
                            saveLabel={<Text style={{ color: "white" }}>Save</Text>}
                            startYear={1920}
                            endYear={2023}
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};
export default RegisterUser;