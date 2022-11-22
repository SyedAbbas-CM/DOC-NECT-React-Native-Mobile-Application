import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React ,{useState} from 'react'
import { Text, TextInput, Button, Title, Paragraph,  SegmentedButtons} from 'react-native-paper';
import profilePic from "../../../assets/profile.png"


const ProfileScreen = () => {
    const [tab, setTab] = useState(0);
    const { height } = useWindowDimensions();

    return ( 
        <View style={styles.root}>
            <View style={{backgroundColor:"white", width:'100%', paddingBottom:20}}> 
              <View style={{...styles.centerX, paddingBottom:10}}>
                <Image source={profilePic}>
                </Image>
              </View>
              
              <View style={{...styles.centerX}}>
                <Text variant="bodyLarge" style={{...styles.centerX}}>Raahim Siddiqi</Text>
                <Text variant="bodySmall" style={{...styles.centerX}}>User from: 11/22/2001</Text>
              </View>
            </View>

            <View style={{flex:1, width:'100%'}}  >
              <SegmentedButtons
                value={tab}
                onValueChange={setTab}
                buttons={[
                  {
                    value: 'profile',
                    label: 'Profile',
                    style: {borderRadius:0, width:'33.3%'},
                  },
                  {
                    value: 'history',
                    label: 'History',
                    style: {borderRadius:0, width:'33.33%', },
                  },
                  {
                    value: 'activity',
                    label: 'Activity',
                    style: {borderRadius:0, width:'33.3%'},
                  },
                ]}
                style={{width:"100%"}}
              />
            </View>
        </View>
     );
}
 

const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop:50
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
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    }
  })
  

export default ProfileScreen;