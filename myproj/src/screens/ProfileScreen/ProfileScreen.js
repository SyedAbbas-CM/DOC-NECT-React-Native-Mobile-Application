import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, KeyboardAvoidingView} from 'react-native'
import React ,{useState, useCallback} from 'react'
import { Text, TextInput, Button, Title, Paragraph,  SegmentedButtons, FAB} from 'react-native-paper';
import profilePic from "../../../assets/profile.png"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileView from '../../components/ProfileView';
import ActivityView from '../../components/ActivityView';
import MedicalHistoryView from '../../components/MedicalHistoryView';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation()
  const [hideProfile, setHideProfile] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const window = useWindowDimensions();
  const [routes] = useState([
      { key: 'first', title: 'Profile' },
      { key: 'second', title: 'History' },
      { key: 'third', title: 'Activity' },
    ]);

  const user = {
    username: "Shadow11",
    firstname : "Raahim",
    lastname : "Siddiqi",
    email : "raahim.s@hotmail.com",
    age : "21",
    dob : "4/4/2001",
    gender : "Male",
    city : "Karachi",
    about : "I am cute.",
    userrole: "user"
  };

  const doctor = {
    username: "Shadow11",
    firstname : "Syed",
    lastname : "Abbas",
    email : "vorix777@gmail.com",
    age : "69",
    dob : "27/4/2001",
    gender : "Female",
    city : "Lahore",
    about : "I am very cute.",
    userrole: "doctor",
    certificationName: "MBBS",
    instituteName: "Aga Khan Hopsital"
  };

    const Profile = useCallback(() => {
      console.log("Re-render");
      return (
        <ProfileView profileMode={hideProfile} userDetails={doctor} toggleProfileMode = {toggleProfileMode} />
      );
    }, [hideProfile])
    
    const MedicalHistory = useCallback(() => {
      return (
        <MedicalHistoryView />
      );
    }, [])
    
    const Activity = useCallback(() => {
      return (
        <ActivityView />
      );
    }, [])
    
    const renderScene = SceneMap({
      first:  Profile,
      second: MedicalHistory,
      third:  Activity
    });

    function toggleProfileMode() {
      setHideProfile(!hideProfile);
    }

    return (
        <View style={styles.root}>   
            {hideProfile == false &&
            <View style={{backgroundColor:"white", width:'100%', paddingBottom:10}}> 
              {/* <Text style={{paddingLeft:10}} variant="bodySmall">points: 69</Text> */}
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
      marginTop:50.
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
  })

export default ProfileScreen;