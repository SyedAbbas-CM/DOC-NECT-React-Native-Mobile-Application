import { ScrollView, View } from "react-native";
import { Text, TextInput, IconButton, HelperText } from "react-native-paper";
import { globalStyles } from "../../global";
import { Formik } from "formik";
import * as yup from 'yup';
export default PostCreationScreen = () => {
    const schema = yup.object({
        title: yup.string().required("Required"),
        body: yup.string().required("Required")
    });

    const onSubmit = (formData) => {
        /* Send formData.title and formData.post  */
        console.log(formData);
    }
    return (
        <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
                title: "",
                body: ""
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 1 }}>
                    <IconButton
                        icon="check"
                        iconColor="white"
                        mode="contained"
                        size={45}
                        style={{ backgroundColor: "#3796f3", position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}
                        onPress={handleSubmit}
                    />
                    <ScrollView>
                        <TextInput
                            placeholder="Title"
                            style={{ fontWeight: 'bold', backgroundColor: "white", fontSize: 25, paddingVertical: 10 }}
                            mode='flat'
                            value={values.title}
                            onChangeText={handleChange("title")}

                        />
                        
                        <HelperText
                            type="error"
                            visible={() => errors.body != ""}>
                            {errors.body}
                        </HelperText>

                        <TextInput
                            multiline
                            placeholder="Write something down!"
                            style={{ fontSize: 20, flexGrow: 1 }}
                            mode='outlined'
                            value={values.body}
                            onChangeText={handleChange("body")}
                            outlineColor="transparent"
                            activeOutlineColor="transparent"
                            selectionColor="#3796f3"
                        />

                        <HelperText
                            type="error"
                            visible={() => errors.body != ""}>
                            {errors.body}
                        </HelperText>
                    
                    </ScrollView>
                </View>
            )}

        </Formik>
    );
}