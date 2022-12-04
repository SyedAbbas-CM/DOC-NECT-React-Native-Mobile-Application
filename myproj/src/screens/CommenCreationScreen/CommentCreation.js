import { ScrollView, View,Alert } from "react-native";
import { Text, TextInput, IconButton, HelperText } from "react-native-paper";
import { globalStyles } from "../../global";
import { Formik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '../../../config';
import { authContext } from "../../context";
import React,{useContext} from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';

export default PostCreationScreen = (route) => {
    const navigation = useNavigation();
    const { auth } = useContext(authContext);
    const schema = yup.object({
        body: yup.string().required("Required")
    });

    const onSubmit = (formData) => {
        if(route.route.params){
        /* Send formData.title and formData.post  */
        console.log(route.route.params)
        axios.post(
            `http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}/Post`, 
            {
              postId:route.route.params.postId,
              parentCommentId:route.route.params.commentId,
              title : formData.title,
              body : formData.body,
              userName:auth.userName,
            }, 
            {timeout : 10000})
            .then((response) => {

              navigation.navigate("HomeScreen");
            })
            .catch( error => {
              if(error.response){
                switch(error.response.data.errorCode){
                  case "auth/invalid-username-password":
                    Alert.alert("Invalid Credentials", "The username or email is incorrect.");
                    break;
                  default:
                    Alert.alert("Invalid request.", "Your request could not be processed. Please try again later or contact support.");
                    break;
                }
              }
              else if(error){
                console.log(error)
              }
              else 
                Alert.alert("404", "The server is irresponsive. Please try again later or contact support.");
            });
            }


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

                        
                        <HelperText
                            type="error"
                            visible={() => errors.body != ""}>
                            {errors.body}
                        </HelperText>

                        <TextInput
                            multiline
                            placeholder="Write something down!"
                            style={{ fontSize: 20, flexGrow: 1 , backgroundColor : "transparent"}}
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