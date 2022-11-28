import { ScrollView, View, Image, StyleSheet } from "react-native";
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from "../global";
import documentIcon from '../../assets/documents2.png';

export const CertificationForm = ({ results }) => {
    const schema = yup.object({
        instituteName: yup.string().min(3, "The minimum length is 3.").required("Required"),
        degreeTitle: yup.string().required("Required"),
        startDate: yup.string().required("Required"),
        endDate: yup.string().required("Required"),
    });
    const labels = ["Institute name", "Degree title", "Start date", "End date"];
    return (
        <ScrollView>
            <Text variant="headlineLarge" style={{fontWeight : "bold", textAlign : "center", marginVertical: 20}}>Certification</Text>
            <Image source={documentIcon} resizeMode="contain" style={styles.image}/>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
                    instituteName: "",
                    degreeTitle: "",
                    startDate: "",
                    endDate: ""
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
                                    />
                                    <HelperText
                                        type="error"
                                        visible={() => errors[key] != ""}>
                                        {errors[key]}
                                    </HelperText>
                                </View>)
                        }
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={globalStyles.button}
                            buttonColor="#3796f3">
                            Submit
                        </Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  image : {
    marginLeft : 'auto',
    marginRight : 'auto',
    marginBottom : 'auto',
    marginTop : 'auto',
    width : '40%',
    height : undefined,
    aspectRatio : 1,
  },
});