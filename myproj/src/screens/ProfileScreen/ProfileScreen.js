import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from 'react-native'
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
  const [index, setIndex] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);
  const window = useWindowDimensions();
  const [routes] = useState([
      { key: 'first', title: 'Profile' },
      { key: 'second', title: 'History' },
      { key: 'third', title: 'Activity' },
    ]);

    const Profile = useCallback(() => {
      return (
        <ProfileView editMode = {editMode} />
      );
    }, [editMode])
    
    const MedicalHistory = useCallback(() => {
      return (
        <MedicalHistoryView />
      );
    }, [editMode])
    
    const Activity = useCallback(() => {
      return (
        <ActivityView />
      );
    }, [editMode])
    
    const renderScene = SceneMap({
      first:  Profile,
      second: MedicalHistory,
      third:  Activity
    });

    function toggleEditMode() {
      setEditMode(!editMode);
    }

    return (
        <View style={styles.root}>   
            {index == 0 && <FAB
              icon = {editMode == 0 ? "pencil" : "pencil-off"}
              style = {styles.fab}
              onPress = {toggleEditMode}
            />}

            {index == 1 && <FAB
              icon = "plus"
              style = {{...styles.fab}}     
              onPress= {() => navigation.navigate("MedicalHistory")}
            />}
          
            {editMode == 0 &&
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
    tabs : {

    },
    fab: {
      position:'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      zIndex:99
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    }
  })

export default ProfileScreen;