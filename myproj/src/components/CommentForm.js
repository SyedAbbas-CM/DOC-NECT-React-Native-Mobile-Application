import React from 'react'
import { TextInput, Button, HelperText } from 'react-native-paper';

import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from '../global';
export default CommentForm = ({ results }) => {
    const schema = yup.object({
        userName: yup.string().min(3, "The minimum length is 3.").required("Required"),

    });

    return (
        <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
                userName: "",
            }}
            onSubmit={data => results(data)}
            validationSchema={schema}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <>
                    <TextInput
                        left={<TextInput.Icon icon="account" />}
                        label="Leave a reply.."
                        value={values.userName}
                        onChangeText={handleChange("userName")}
                        style={globalStyles.input}
                        mode="outlined"
                        outlineColor="#c4c4c4"
                        activeOutlineColor="#3796f3"
                    />
                    <HelperText
                        type="error"
                        visible={() => errors.userName != ""}>
                        {errors.userName}
                    </HelperText>
                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={globalStyles.button}
                        buttonColor="#3796f3">
                        Submit
                    </Button>
                </>
            )

            }
        </Formik>
    );
}