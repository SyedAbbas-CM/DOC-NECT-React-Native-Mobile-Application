import { View, ScrollView, StyleSheet} from 'react-native'
import React , {useState, useCallback, useContext, useEffect} from 'react'
import { Icon, Text, Button, Title, Paragraph, List, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '../../../config';
import { authContext, themeContext } from '../../context';
import { DarkTheme, LightTheme } from '../../themes';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const auth = useContext(authContext);
    const {theme, setTheme} = useContext(themeContext);


    const [showPrivacyDropDown, setShowPrivacyDropDown] = useState(false);
    const [privacyLevel, setPrivacyLevel] = useState("")
    const [privacyLevelList, setPrivacyLevelList] = useState([
        {label: "Public", value : '0'},
        {label: "Semi-Private", value : '1'},
        {label: "Private", value : '2'},
    ]);

    const styles = createStyles(theme);

    const [showThemeDropDown, setShowThemeDropDown] = useState(false);
    const [themeSettings, setThemeSettings] = useState("");
    const [themeSettingsList, setThemeSettingsList] = useState([
        {label: "Light", value: "LIGHT"},
        {label: "Dark", value: "DARK"},
    ]);
    
    useEffect(() => {
        axios.get(`http://${SERVER_IP}:${SERVER_PORT}/api/getSettings`,
        {
          headers: {
            "authorization": `BEARER ${auth.auth.accessToken}`
          }
        })
        .then((response) => {
          setPrivacyLevel(response.data.data[0].privacy)
          setThemeSettings(response.data.data[0].theme)
        })
        .catch((error) => {
            if(error.response){
              switch(error.response.data.errorCode){
                  case "auth/unauthorized-access":
                      Alert.alert("Unauthorized Access!", "Unauthorized access has been detected. Please log in again.");
                      navigation.navigate("SignIn");
                      break;
                  default:
                      console.log(error.response.errorCode);
                      Alert.alert("Invalid request.", "Your request could not be processed. Please try again later or contact support.");
                      break;
              }
           }
            else
              Alert.alert("404", "The server is irresponsive. Please try again later or contact support.");
          })
    }, [])

    function UpdateSettings() {
        axios.post(`http://${SERVER_IP}:${SERVER_PORT}/api/updateSettings`,
        {
            privacy: privacyLevel,
            theme : themeSettings
        },
        {
          headers: {
            "authorization": `BEARER ${auth.auth.accessToken}`
          }
        })
        .then((response) => {
            console.log("settings updated successfully");
            setTheme(themeSettings)
        })
        .catch((error) => {
            if(error.response){
              switch(error.response.data.errorCode){
                  case "auth/unauthorized-access":
                      Alert.alert("Unauthorized Access!", "Unauthorized access has been detected. Please log in again.");
                      navigation.navigate("SignIn");
                      break;
                  default:
                      console.log(error.response.errorCode);
                      Alert.alert("Invalid request.", "Your request could not be processed. Please try again later or contact support.");
                      break;
              }
           }
            else
              Alert.alert("404", "The server is irresponsive. Please try again later or contact support.");
          })
    }

    return ( 
        <View style={{...styles.background}}>
            <View style={{...styles.root}}>
                <Title style={{fontSize:16, paddingBottom:20, paddingLeft:20, ...styles.heading}}>Users Settings and Preferences</Title>
                
                <View style={{paddingLeft:20}}>
                    <View style={styles.custom_listitem}>
                        <View style={{width:'50%', marginTop:"auto", marginBottom:"auto", flexDirection:"row"}}>
                            <List.Icon style={{paddingRight: 20}} color="grey" icon="incognito"/>
                            <Text style={styles.text_medium}>Privacy Level</Text>
                        </View>
                        <View style={{width:'50%', paddingRight:20}}>
                            <DropDownPicker 
                                style={styles.input}
                                labelStyle={styles.text_medium}
                                containerStyle={{marginLeft:"auto", maxWidth:150}}
                                height = "20"
                                placeholder=""
                                label=""
                                listMode="SCROLLVIEW"
                                open={showPrivacyDropDown}
                                setOpen={setShowPrivacyDropDown}
                                value={privacyLevel}
                                setValue={setPrivacyLevel}
                                items={privacyLevelList}
                                setItems={setPrivacyLevelList}
                            />
                        </View>
                    </View>

                    <View style={styles.custom_listitem}>
                        <View style={{width:'50%', marginTop:"auto", marginBottom:"auto", flexDirection:"row"}}>
                            <List.Icon style={{paddingRight: 20}} color="grey" icon="palette" />
                            <Text style={styles.text_medium}>Theme Settings</Text>
                        </View>
                        <View style={{width:'50%', paddingRight:20, zIndex: 10 }}>
                            <DropDownPicker 
                                style={styles.input}
                                labelStyle={styles.text_medium}
                                containerStyle={{marginLeft:"auto", maxWidth:150}}
                                height = "20"
                                placeholder=""
                                label=""
                                listMode="SCROLLVIEW"
                                open={showThemeDropDown}
                                setOpen={setShowThemeDropDown}
                                value={themeSettings}
                                setValue={setThemeSettings}
                                items={themeSettingsList}
                                setItems={setThemeSettingsList}
                            />
                        </View>
                    </View>
                </View>

                <Button style={{marginTop: 40, width:190, ...styles.centerX, borderRadius:8}} 
                        buttonColor = {theme.colors.primaryButton}
                        mode="contained"
                        onPress={UpdateSettings}>
                        Confirm Changes
                </Button>

                <View style={{paddingLeft:20, marginTop: "auto"}}>
                    <List.Item
                        titleStyle={styles.text_medium}
                        onPress={() => navigation.navigate("Certification")}
                        style={styles.listitem}
                        title="Get Certified!"
                        left={() => <List.Icon color="grey" icon="arrow-up-bold" />}/>     

                    <List.Item
                        titleStyle={styles.text_medium}
                        onPress={() => navigation.navigate("Policy")}
                        style={styles.listitem}
                        title="Terms and Conditions"
                        left={() => <List.Icon color="grey" icon="information" />}/>     
                </View>
            </View>
        </View>
     );
}
 
export default SettingsScreen;

const createStyles = ({colors}) => StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: colors.background,
    },
    root : {
      flex:1,
      paddingTop: 10,
      margin:5,
      backgroundColor: colors.primaryContainer
    },
    input : {
      marginVertical:10, 
      backgroundColor : colors.onPrimaryContainer,
      color : 'black'
    },
    button : {
      marginVertical:10,
      borderRadius: 5,
      color: colors.primaryButton
    },
    heading: {
        color: colors.primaryText,
        fontSize:20
    },
    text_medium : {
        color: colors.primaryText,
        fontSize:16
    },
    text_small : {
        color: colors.primaryText,
        fontSize:14
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    listitem : {
        paddingBottom: 15,
        paddingTop: 15,
    },
    custom_listitem: {
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection:'row',  
        width:'100%',
    }
  })