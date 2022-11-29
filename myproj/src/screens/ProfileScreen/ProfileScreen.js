import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, KeyboardAvoidingView} from 'react-native'
import React ,{useState, useCallback, useEffect, useContext} from 'react'
import { Icon, Text, TextInput, Button, Title, Paragraph,  SegmentedButtons, FAB, Avatar} from 'react-native-paper';
import profilePic from "../../../assets/profile.png"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileView from '../../components/ProfileView';
import ActivityView from '../../components/ActivityView';
import MedicalHistoryView from '../../components/MedicalHistoryView';
import { useNavigation } from '@react-navigation/native';
import points from "../../../assets/points.png"
import axios from 'axios';
import authContext from '../../context';
import { SERVER_IP, SERVER_PORT } from '../../../config';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { auth } = useContext(authContext);
  const [hideProfile, setHideProfile] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const window = useWindowDimensions();
  const [routes] = useState([
      { key: 'first', title: 'Profile' },
      { key: 'second', title: 'History' },
      { key: 'third', title: 'Activity' },
    ]);

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState(null);
  const [activty, setActivity] = useState(null);
  console.log("context" + "Bearer " + String(auth.accessToken))

    useEffect(() => {
      axios.get(`http://${SERVER_IP}:${SERVER_PORT}/User/getUser/Shadow`, {
        headers: {
          Authorization: "Bearer " + String(auth.accessToken)
       }
      })
        .then((response) => {
          let temp = response.data.data[0];
          temp["dob"] = temp["dob"].split("T")[0]
          temp["gender"] = temp["gender"].toLowerCase()
          setUser(temp);
        })
        .catch((response) => {
          console.log(response);
        })
    }, [])

  const Profile = useCallback(() => {
    console.log("Profile Component re-render");
    return (
      <ProfileView updateUserDetails={updateUserDetails} profileMode={hideProfile} userDetails={user} toggleProfileMode = {toggleProfileMode} />
    );
  }, [hideProfile, user])
  
  const MedicalHistory = useCallback(() => {
    console.log("History Component re-render");
    return (
      <MedicalHistoryView userHistory = {history}/>
    );
  }, [history])
  
  const Activity = useCallback(() => {
    console.log("Activity Component re-render");
    return (
      <ActivityView userActivity = {activty}/>
    );
  }, [activty])
  
  const renderScene = SceneMap({
    first:  Profile,
    second: MedicalHistory,
    third:  Activity
  });

  function toggleProfileMode() {
    setHideProfile(!hideProfile);
  }

  function updateUserDetails(newUserDetails) {
    setUser({...user, ...newUserDetails});

    axios.post("http://192.168.150.226:8090/User/updateProfile", newUserDetails)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      })
  }

  return (
      <View style={styles.root}>  
          {user && user.userRole.toLowerCase() == "doctor" && hideProfile == false &&
          <View style={styles.fab}>
            <Image source={points}></Image>
            <View padding={2} left={6} top={34} position="absolute" backgroundColor="lightblue" borderRadius={8}>
              <Text style={{...styles.centerX}} variant='bodySmall' color="black">100</Text>
            </View>
          </View>}

          {hideProfile == false &&
          <View style={{backgroundColor:"white", width:'100%', paddingBottom:10}}> 
            <View style={{...styles.centerX, paddingBottom:10}}>
              <Image source={profilePic}>
              </Image>
            </View>
            
            <View style={{...styles.centerX}}>
              <Text variant="bodyLarge" style={{...styles.centerX}}>Raahim Siddiqi</Text>
              <Text variant="bodySmall" style={{...styles.centerX}}>User from: 11/22/2001</Text>
            </View>
          </View>
          }
      
          <View style={{flex:1, width:'100%'}}  >
            <TabView
              lazy
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: window.width }}
            />
          </View>
      </View>
    );
}
 

const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop: 6
    },
    input : {
      marginVertical:10, 
      backgroundColor : "white",
      color : 'gray'
    },
    button : {
      marginVertical:10,
      borderRadius: 5
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    fab: {
      position: 'absolute',
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      left: 0,
      top: 0,
      zIndex: 99
  },
  })

export default ProfileScreen;