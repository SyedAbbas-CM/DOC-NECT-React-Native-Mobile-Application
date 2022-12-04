import { View, Image,StyleSheet, ImageBackground,ActivityIndicator,FlatList,useWindowDimensions, Pressable} from 'react-native'
import React ,{useEffect, useState,useContext} from 'react'
import { Text, TextInput, Button,IconButton,HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SERVER_IP, SERVER_PORT } from '../../../config';
import axios from 'axios';
import { authContext, themeContext } from '../../context';
import { globalStyles } from '../../global';
import DialogInput from 'react-native-dialog-input';
import * as yup from 'yup';
import { Formik } from 'formik';
import CommentForm from '../../components/CommentForm';

const PostScreen = (route) => {
  const { setTheme} = useContext(themeContext);
  const { auth } = useContext(authContext);
  const navigation = useNavigation();
  const { height,width } = useWindowDimensions();
  const [feed,setFeed] =useState([]);
  const [post,setPost]= useState();
  const [comment,setComment]=useState();



useEffect(()=>{
    fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}`)
    .then((re)=>re.json())
    .then((re)=>{
      setPost(re);
      console.log(post[0])
    })
    fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}/comments`)
    .then((re)=>re.json())
    .then((re)=>{
      setFeed(re)

    })
  },[],)
  const onSelectUser=(userName)=>{
    console.log(userName)
    //Raahim do something here idk pass in the userName or userId and search for a profile and display it 
    //navigation.navigate(userName);
  }
  const onDelete=(commentId)=>{
    axios.delete(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}/delete?commentId=${commentId}`)
    refreshData();

  }

  const refreshData=()=>{
    fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}/comments`)
    .then((re)=>re.json())
    .then((re)=>{
      setFeed(re)

    })
  }
  const Reply = (formData) => {
    axios.post(
      `http://${SERVER_IP}:${SERVER_PORT}/api/home/main/${route.route.params.postId}/Post`, 
      {
        postId:route.route.params.postId,
        userName:auth.userName,
        body:formData.userName,
      }, 
      {timeout : 10000})
      .then((response) => {

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
      refreshData();
  }
return(
 
  <View style={styles.mainView} >
    <View style ={styles.Post}>
  <Text style={styles.Heading} >{route.route.params.title}</Text>
  <Text style={styles.textbody}>{route.route.params.body}</Text>
  </View>

  <CommentForm results={Reply}/>
     

  <FlatList
        contentContainerStyle={{ paddingBottom: 5 }}
        data={feed}
        keyExtractor={item=>{item.commentId}}
        renderItem={({item})=>(
        
        <View style={styles.feedBox} paddingLeft={10} paddingRight={10} >
            <View style={styles.postTitle}>

            <View flexDirection={'row'}>

            <View ><Text style={styles.postDetails}>{" Commented by: "}</Text></View>
            <Pressable 
             onLongPress={()=>{onSelectUser(item.userName)}}>
             <Text style={styles.postusername} >{item.userName} </Text></Pressable>
             <Text style={styles.postDetails}>{" on "+item.creationTime}</Text>
            </View>
            {item.parentCommentId != null ?  
            <View ><Text style={styles.postDetails}>{" Replying to: "+item.parentCommentId}</Text></View>:
            ""}
            <View ><Text style={styles.postDetails}>{" id: "+item.commentId}</Text></View>
             {item.userRole === 'DOCTOR' ? 
              <Text style={styles.Doctorposttitle} >
              {item.body}
              </Text> 
              :
              <Text style={styles.postTitle} >
              {item.body}
              </Text>
              }
           
              

            </View >
            
            <View style={styles.BottomIcons}>
            <IconButton
                icon={"message-outline"}
                size={20}
                onPress = {()=>navigation.navigate("CommentCreation",{
                  commentId: item.commentId,
                  postId:route.route.params.postId
                })}
            />
            <IconButton 
                icon={"thumb-up-outline"}
                size={20}
            />

            {item.userName == auth.userName ? 
            <IconButton 
            icon={"window-close"}
            size={20}
            onPress = {() => onDelete(item.commentId)}
            />
            :
            ""}
            </View>

        </View>
          
        )
        }
         />
  </View>
)
};
const styles = StyleSheet.create({
  mainView:{
    flex:1,
    allignItems:'center',
  },
  Heading:{
    fontSize:32,
    marginTop:10,
    fontWeight:'bold',
    justifyContent: 'center',
    allignItems:'center'
  },
  textbody:{
    fontSize:20,
    marginTop:6,

  },
  TextInput:{
    height:39,
    width:'90',
    backgroundColor:'#EBEBEB',
    borderRadius:20,

  },
  TextInputView:{
    display:'flex',
    allignItems:'center'
  },
  mainPostView:{
    width:'100%',
    display:'flex',
    allignItems:'center'
  },
  postView:{

    allignItems:'center',
    marginTop:30,
  },
  Post:{
    marginBottom:30,
  },
  postTitle:{
    fontSize:15,

  }, 
  Doctorposttitle:{
    fontSize:25,
    fontWeight: 'bold',
  }, 
  TitleView:{
    fontSize:25,

  },
  postDetails:{
    fontSize:10,
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  postusername:{
    fontSize:10,
    color:'blue'
  },
  BottomIcons:{
    flexDirection:'row',

  },
})


export default PostScreen ;



//rnfe 