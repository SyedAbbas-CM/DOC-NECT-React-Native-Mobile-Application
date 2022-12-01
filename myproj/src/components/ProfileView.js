import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, Alert, FlatList, Keyboard } from 'react-native'
import { Text, TextInput, Button, Title, Paragraph, FAB, useTheme} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { FastField, useFormik, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import { MemoInputComponent } from './utils/MemoInputField';
import { DatePickerModal } from 'react-native-paper-dates';

const schema = yup.object({
    firstName: yup.string()
        .max(30)
        .required("Required"),
    lastName: yup.string()
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


function calculate_age(birth_year, birth_month, birth_day)
{
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}

const ProfileView = ({ toggleProfileMode, userDetails, profileMode, updateUserDetails }) => {
    let isAlertActive = 0;

    const theme = useTheme();
    const date = new Date();
    const [editMode, setEditMode] = React.useState(profileMode);
    const [showDropDown, setShowDropDown] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [age, setAge] = useState(null);

    const openDatePicker = () => {
        Keyboard.dismiss();
        setDatePickerOpen(true);
    }

    useEffect(() => {
        if (userDetails) {
            d = userDetails.dob.split('T')[0]
            setAge(calculate_age(d.split('-')[0], d.split('-')[1], d.split('-')[2]).toString())
        }
    }, [])

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

    const onDismissDatePicker = React.useCallback(() => {
        setDatePickerOpen(false);
      }, [setDatePickerOpen]);

    const onConfirmDatePicker = React.useCallback(
        (params, setFieldValue) => {
          setDatePickerOpen(false);
          setFieldValue("dob",params.date.toISOString().split('T')[0])

          d = params.date.toISOString().split('T')[0]
          console.log(calculate_age(d.split('-')[0], d.split('-')[1], d.split('-')[2]))
          setAge(calculate_age(d.split('-')[0], d.split('-')[1], d.split('-')[2]).toString())
        },
        [setDatePickerOpen]
      );

    const toggleEditMode = (dirty) => {
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
        {userDetails &&
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    firstName: userDetails.firstName ? userDetails.firstName  : "",
                    lastName: userDetails.lastName ? userDetails.lastName: "",
                    email: userDetails.email ? userDetails.email: "",
                    dob: userDetails.dob ? userDetails.dob: "",
                    gender: userDetails.gender ? userDetails.gender: "",
                    city: userDetails.city ? userDetails.city: "",
                    about: userDetails.about ? userDetails.about: "",
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                    Keyboard.dismiss();
                    _toggleEditMode();
                    updateUserDetails(values);
                }}>
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    dirty
                }) => (
                    <>
                    <FAB
                        icon={editMode == 0 ? "pencil" : "pencil-off"}
                        style={{...styles.fab, backgroundColor: theme.colors.secondary}}
                        onPress={() => toggleEditMode(dirty)}
                    />
                    <View style={styles.root}>
                        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                            <View style={{ ...styles.row, flexDirection: "row", width: '100%' }}>
                                <View style={{ width: '50%', paddingRight: 10 }}>
                                    <MemoInputComponent disabled={editMode} 
                                                   name ={"firstName"} 
                                                   label="Firstname"/>
                                    {errors.firstName && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.firstName}</Text>}
                                </View>

                                <View style={{ width: '50%', paddingLeft: 10 }}>
                                    <MemoInputComponent disabled={editMode} 
                                                   name ={"lastName"} 
                                                   label="Lastname"/>
                                    {errors.lastName && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.lastName}</Text>}
                                </View>
                            </View>

                            <View style={{ ...styles.row }}>
                                <MemoInputComponent disabled={editMode} 
                                                   name ={"email"} 
                                                   label="Email"/>
                                {errors.email && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.email}</Text>}
                            </View>

                            <View style={{ ...styles.row, flexDirection: "row", width: '100%' }}>
                                <View style={{ width: '42%', marginRight: '8%' }}>
                                    <TextInput style={{ ...styles.input }}
                                        value={age}
                                        editable={false}
                                        label="Age"
                                        mode="outlined"
                                        disabled
                                    ></TextInput>
                                    {errors.age && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.age}</Text>}
                                </View>

                                <View style={{ width: '42%', marginLeft: '8%', paddingTop: 5 }}>
                                    <DropDownPicker disabledStyle={{ opacity: 0.6,  borderColor: "lightgrey" }}
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
                                        onFocus = {openDatePicker}
                                        editable={true}
                                        value = {values.dob}
                                        label="D.O.B"
                                        mode="outlined"
                                        disabled={editMode == true ? false : true}
                                    ></TextInput>
                                    <DatePickerModal
                                        locale="en"
                                        mode="single"
                                        visible={datePickerOpen}
                                        date = {date}
                                        onDismiss={onDismissDatePicker}
                                        onConfirm={(params) => onConfirmDatePicker(params, setFieldValue)}
                                        saveLabel={<Text style={{color:"white"}}>Save</Text>}
                                        startYear={1920}
                                        endYear={2023}
                                        />
                                    {errors.dob && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.dob}</Text>}
                                </View>

                                <View style={{ width: '42%', marginLeft: '8%' }}>
                                    <MemoInputComponent disabled={editMode} 
                                                        name ={"city"} 
                                                        label="City"
                                                        />
                                    {errors.city && <Text style={{ ...styles.error }} variant='bodySmall'>{errors.city}</Text>}
                                </View>
                            </View>

                            {userDetails && userDetails.userRole == "doctor" &&
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
                )}</Formik>}
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
        zIndex: 99,
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