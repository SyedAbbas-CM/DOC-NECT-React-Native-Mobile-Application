import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, Alert, FlatList } from 'react-native'
import { Text, TextInput, Button, Title, Paragraph, FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { FastField, useFormik, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    firstname: yup.string()
        .max(30)
        .required("Required"),
    lastname: yup.string()
        .required("Required"),
    email: yup.string()
        .email()
        .required("Required"),
    dob: yup.date()
        .required("Required"),
    gender: yup.string()
        .required("Required"),
    city: yup.string()
        .required("Required")
        .max(30, "Max Length Exceeded"),
    about: yup.string()
        .max(1000)
})


const ProfileView = ({ toggleProfileMode, userDetails, profileMode }) => {
    let isAlertActive = 0;
    const [editMode, setEditMode] = React.useState(profileMode);
    const [showDropDown, setShowDropDown] = useState(false);

    const [genderList, setGenderList] = useState([
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Others", value: "others" },
    ]);

    const showAlert = () => {
        isAlertActive = 1;
        Alert.alert(
            "Confirmation",
            "Are you sure you want to discard your changes without saving?",
            [
                {
                    text: "No",
                    onPress: () => console.log("exit"),
                },
                { text: "Yes", onPress: _toggleEditMode }
            ]
        ), isAlertActive = 1;
    }

    const toggleEditMode = (dirty) => {
        console.log(isAlertActive)
        if (dirty && isAlertActive == 0)
            showAlert()
        else
            _toggleEditMode();
    }

    const _toggleEditMode = () => {
        setEditMode(!editMode);
        toggleProfileMode();
    }

    return (
        <>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    firstname: userDetails.firstname ? userDetails.firstname : "",
                    lastname: userDetails.lastname ? userDetails.lastname : "",
                    email: userDetails.email ? userDetails.email : "",
                    age: userDetails.age ? userDetails.age : "",
                    dob: userDetails.dob ? userDetails.dob : "",
                    gender: userDetails.gender ? userDetails.gender : "",
                    city: userDetails.city ? userDetails.city : "",
                    about: userDetails.about ? userDetails.about : "",
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                    console.log(values);
                    _toggleEditMode();
                }}>
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    dirty
                    /* and other goodies */
                }) => (
                    <>
                    <FAB
                        icon={editMode == 0 ? "pencil" : "pencil-off"}
                        style={styles.fab}
                        onPress={() => toggleEditMode(dirty)}
                    />
                    <View style={styles.root}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ ...styles.row, flexDirection: "row", width: '100%' }}>
                                <View style={{ width: '50%', paddingRight: 10 }}>
                                    <TextInput style={{ ...styles.input }}
                                        onChangeText={handleChange('firstname')}
                                        value={values.firstname}
                                        editable={editMode == 1 ? true : false}
                                        label="firstname"
                                        mode="outlined"
                                        disabled={editMode == true ? false : true}
                                    ></TextInput>
                                    {errors.firstname && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.firstname}</Text>}
                                </View>

                                <View style={{ width: '50%', paddingLeft: 10 }}>
                                    <TextInput style={{ ...styles.input }}
                                        onChangeText={handleChange('lastname')}
                                        value={values.lastname}
                                        editable={editMode == 1 ? true : false}
                                        label="Lastname"
                                        mode="outlined"
                                        disabled={editMode == true ? false : true}
                                    />
                                    {errors.lastname && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.lastname}</Text>}
                                </View>
                            </View>

                            <View style={{ ...styles.row }}>
                                <TextInput style={{ ...styles.input }}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    editable={editMode == 1 ? true : false}
                                    label="Email"
                                    mode="outlined"
                                    disabled={editMode == true ? false : true}
                                ></TextInput>
                                {errors.email && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.email}</Text>}
                            </View>

                            <View style={{ ...styles.row, flexDirection: "row", width: '100%' }}>
                                <View style={{ width: '42%', marginRight: '8%' }}>
                                    <TextInput style={{ ...styles.input }}
                                        onChangeText={handleChange('age')}
                                        value={values.age}
                                        editable={false}
                                        label="Age"
                                        mode="outlined"
                                        disabled
                                    ></TextInput>
                                    {errors.age && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.age}</Text>}
                                </View>

                                <View style={{ width: '42%', marginLeft: '8%', paddingTop: 5 }}>
                                    <DropDownPicker disabledStyle={{ opacity: 0.6, borderColor: "lightgrey" }}
                                        placeholder="Gender"
                                        label="gender"
                                        listMode="SCROLLVIEW"
                                        open={showDropDown}
                                        value={values.gender}
                                        items={genderList}
                                        setOpen={setShowDropDown}
                                        setValue={item => setFieldValue("gender", item())}
                                        setItems={setGenderList}
                                        disabled={editMode == true ? false : true}
                                    />
                                    {errors.gender && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.gender}</Text>}
                                </View>
                            </View>

                            <View style={{ ...styles.row, flexDirection: "row", width: '100%' }}>
                                <View style={{ width: '42%', marginRight: '8%' }}>
                                    <TextInput style={{ ...styles.input }}
                                        onChangeText={handleChange('dob')}
                                        value={values.dob}
                                        editable={editMode == 1 ? true : false}
                                        label="D.O.B"
                                        mode="outlined"
                                        disabled={editMode == true ? false : true}
                                    ></TextInput>
                                    {errors.dob && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.dob}</Text>}
                                </View>

                                <View style={{ width: '42%', marginLeft: '8%' }}>
                                    <TextInput style={{ ...styles.input }}
                                        onChangeText={handleChange('city')}
                                        value={values.city}
                                        editable={editMode == 1 ? true : false}
                                        label="City"
                                        mode="outlined"
                                        disabled={editMode == true ? false : true}
                                    ></TextInput>
                                    {errors.city && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.city}</Text>}
                                </View>
                            </View>

                            {userDetails.userrole == "doctor" &&
                                <View style={{ ...styles.doctorView }}>
                                    <Text>Doctor Info</Text>
                                    <View style={{ ...styles.row }}>
                                        <TextInput style={{ ...styles.input, marginBottom: 10 }}
                                            value={userDetails.certificationName}
                                            label="Certification"
                                            mode="outlined"
                                            disabled
                                        ></TextInput>

                                        <TextInput style={{ ...styles.input, marginTop: 10, marginBottom: 10 }}
                                            value={userDetails.instituteName}
                                            label="Institue Name"
                                            mode="outlined"
                                            disabled
                                        ></TextInput>
                                    </View>
                                </View>
                            }

                            <View style={{ ...styles.row, paddingTop: 20 }}>
                                <Text variant='bodyLarge' style={{ color: editMode ? "black" : "grey" }}>About Me</Text>
                                <TextInput style={{ ...styles.multiline_input }}
                                    onChangeText={handleChange('about')}
                                    value={values.about}
                                    editable={editMode == 1 ? true : false}
                                    multiline
                                    mode="outlined"
                                    numberOfLines={4}
                                    disabled={editMode == true ? false : true}
                                ></TextInput>
                                {errors.about && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.about}</Text>}
                            </View>

                            {editMode == 1 &&
                                <Button onPress={handleSubmit} style={{ ...styles.button }} mode='contained'>
                                    Save Changes
                                </Button>}

                            <View style={{ paddingBottom: 75 }}></View>
                        </ScrollView>
                    </View>
                    </>
                )}</Formik>
        </>
    );
}

export default React.memo(ProfileView);


const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 25,
        paddingLeft: 25,
    },
    centerX: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    error: {
        color: "red",
        fontStyle: "italic"
    },
    row: {
        paddingTop: 12,
        paddingBottom: 12
    },
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 99
    },
    button: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    doctorView: {
        borderTopWidth: 1,
        borderTopColor: "grey",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginTop: 20,
        marginBottom: 20,
        opacity: 0.5
    }
})