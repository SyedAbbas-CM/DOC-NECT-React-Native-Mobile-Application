import { View, ScrollView, StyleSheet} from 'react-native'
import React , {useState, useCallback} from 'react'
import { Icon, Text, Button, Title, Paragraph, List, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


const SettingsScreen = () => {
    const navigation = useNavigation();

    const [showPrivacyDropDown, setShowPrivacyDropDown] = useState(false);
    const [privacyLevel, setPrivacyLevel] = useState("")
    const [privacyLevelList, setPrivacyLevelList] = useState([
        {label: "Public", value : 0},
        {label: "Semi-Private", value : 1},
        {label: "Private", value : 2},
    ]);

    const [showThemeDropDown, setShowThemeDropDown] = useState(false);
    const [themeSettings, setThemeSettings] = useState("");
    const [themeSettingsList, setThemeSettingsList] = useState([
        {label: "Light", value: "light"},
        {label: "Dark", value: "dark"},
    ]);

    return ( 
        <View style={{...styles.root}}>
            <View style={{flex:1}}>
                <Title style={{fontSize:16, paddingBottom:20, paddingLeft:20}}>Users Settings and Preferences</Title>
                
                <View style={{paddingLeft:20}}>
                    <View style={styles.custom_listitem}>
                        <View style={{width:'50%', marginTop:"auto", marginBottom:"auto", flexDirection:"row"}}>
                            <List.Icon style={{paddingRight: 20}} color="grey" icon="incognito"/>
                            <Text>Privacy Level</Text>
                        </View>
                        <View style={{width:'50%', paddingRight:20}}>
                            <DropDownPicker 
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
                            <Text>Theme Settings</Text>
                        </View>
                        <View style={{width:'50%', paddingRight:20, zIndex: 10 }}>
                            <DropDownPicker 
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

                <Button style={{marginTop: 40, width:190, ...styles.centerX, borderRadius:8}} mode="contained">
                        Confirm Changes
                </Button>

                <View style={{paddingLeft:20, marginTop: "auto"}}>
                    <List.Item
                        onPress={() => navigation.navigate("Certification")}
                        style={styles.listitem}
                        title="Get Certified!"
                        left={() => <List.Icon color="grey" icon="arrow-up-bold" />}/>     

                    <List.Item
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

const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop: 10
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