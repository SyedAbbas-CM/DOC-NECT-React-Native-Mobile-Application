import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, Alert } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme, FAB, IconButton, Text  } from 'react-native-paper';
import React , {useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const records = {
  0: {
    name: "I am turning into a Cat",
    startDate : "2030-2-21",
    endDate : "2031-2-27",
    symptoms: "Meow Meow Meow",
    description: "I am a cat. Meow Desu."
  },
  1: {
    name: "Diabetes",
    startDate : "2001-4-11",
    endDate : "2000-6-1",
    symptoms: "Looking at a Photo of Abbas with his hair down.",
    description: "Have attempted self-treatment by performing an excorcism and cleansing of the soul."
  },
  2: {
    name: "Head pain",
    startDate : "2011-4-11",
    endDate : "2012-1-1",
    symptoms: "Problems began due to listening to my friends babble about retarded shit all the time. I am recovered now because I am home.",
    description: "Constant headaches and butt pains. Feel really tired and sleepy"
  }
}


const MedicalHistoryView = ({userHistory}) => {
    let isAlertActive = 0;
    const navigation = useNavigation()
    const theme = useTheme();
    const LeftContent = props => <Avatar.Icon {...props} icon="needle" />
    const RightContent = props => <View marginRight="auto"><IconButton iconColor='#768207' icon="trash-can" onPress={() => deleteRecord(props)}/></View>

    const showAlert = () => {
      isAlertActive = 1;
      Alert.alert(
          "Confirmation",
          "Are you sure you want to delete this record?",
          [
            {
              text: "No",
              onPress: () => console.log("exit dialog"),
            },
            { text: "Yes", onPress: _deleteRecord }
          ]       
    ), isAlertActive = 0;}

    const deleteRecord = (props) => {
      if (isAlertActive == 0) 
          showAlert()
      else 
          _deleteRecord
  }

  const _deleteRecord = () => {
    console.log("delete that shit");
  }

    return (  
        <>
        <FAB
          icon = "plus"
          style={{...styles.fab, backgroundColor: theme.colors.secondary}}   
          onPress= {() => navigation.navigate("MedicalHistory", {operation : "add"})}
          />
        {userHistory && <View style = {styles.root}>
          <ScrollView>
          {Object.keys(userHistory).map((key, index) => 
              <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
                <Card.Title key = {index} titleStyle={{fontSize:24, minHeight:'auto'}} 
                            title={userHistory[key].name} subtitle={userHistory[key].startDate + " to " + (userHistory[key].endDate.length > 0 ? userHistory[key].endDate : "")}
                            left={LeftContent} right={RightContent}/>
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
        </View>}
      </>
    );
}
 
export default MedicalHistoryView;


const styles = StyleSheet.create({
  root : {
    flex:1,
    paddingTop: 5,
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