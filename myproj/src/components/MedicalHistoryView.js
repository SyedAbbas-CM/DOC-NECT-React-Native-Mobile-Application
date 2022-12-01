import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, Alert } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme, FAB, IconButton, Text  } from 'react-native-paper';
import React , {useState, useContext, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '../../config';
import authContext from '../../src/context';


const MedicalHistoryView = ({userHistory, deleteRecord}) => {
    let isAlertActive = 0;
    const { auth } = useContext(authContext);
    const navigation = useNavigation();
    const theme = useTheme();

    const LeftContent = props => <Avatar.Icon {...props} icon="needle" />
    const RightContent = props => <View marginRight="auto"><IconButton iconColor='#768207' icon="trash-can" onPress={() => handleDelete(props)}/></View>

    const showAlert = (props) => {
      isAlertActive = 1;
      Alert.alert(
          "Confirmation",
          "Are you sure you want to delete this record?",
          [
            {
              text: "No",
              onPress: () => console.log("exit dialog"),
            },
            { text: "Yes", onPress: () => deleteRecord(props) }
          ]       
    ), isAlertActive = 0;}

    const handleDelete = (props) => {
      console.log(props);
      if (isAlertActive == 0) 
          showAlert(props)
      else 
          deleteRecord(props);
  }

    return (  
        <>
        <FAB
          icon = "plus"
          style={{...styles.fab, backgroundColor: theme.colors.secondary}}   
          onPress= {() => navigation.navigate("MedicalHistory", {operation : "add"})}
          />
        {userHistory.length >= 1 ? <View style = {styles.root}>
          <ScrollView>
          {Object.keys(userHistory).map((key, index) => 
              <Card key = {index} elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
                <Card.Title titleStyle={{fontSize:20, minHeight:'auto'}} 
                            title={userHistory[key].ailmentName} subtitle={userHistory[key].startDate.split('T')[0] + " to " + (userHistory[key].endDate.length > 0 ? userHistory[key].endDate.split('T')[0] : "")}
                            left={LeftContent} right={() => RightContent(userHistory[key].recordId)}/>
                <Card.Content>
                  <Paragraph><Text>Symptoms: </Text>{userHistory[key].symptoms}</Paragraph>
                  <Paragraph>{userHistory[key].description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => navigation.navigate("MedicalHistory", {operation : "edit", recordDetails: userHistory[key]})} mode="text" textColor={theme.colors.primary}>Edit</Button>
                </Card.Actions>
              </Card>       
          )}

          <View style={{paddingBottom:75}}></View>
          </ScrollView>
        </View> : 
        <View style={styles.root}>
          <Text style={{...styles.center}}>No Records Found</Text>
        </View>
        }
      </>
    );
}
 
export default MedicalHistoryView;


const styles = StyleSheet.create({
  root : {
    flex:1,
  },
  center : {
    marginLeft : 'auto', 
    marginRight : 'auto',
    marginTop : 'auto',
    marginBottom: 'auto'
  },
  centerX : {
    marginLeft : 'auto', 
    marginRight : 'auto'
  },
  button : {
    borderRadius: 0
  }, 
  card : {
    marginLeft: 5,
    marginRight: 8,
    marginTop: 10
  },
  fab: {
    position:'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex:99
  },
  iconButton: {
    boxShadow : "none",
    backgroundColor : 'white',
    borderRadius : 0,
    borderColor : 'transparent',
    borderColor : "white"
  }
})