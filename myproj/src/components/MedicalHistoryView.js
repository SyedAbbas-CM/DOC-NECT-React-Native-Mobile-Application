import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView, Alert } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme, FAB, IconButton  } from 'react-native-paper';
import React , {useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const details = {
  name: "Mahad",
  startDate : "20/2/2030",
  endDate : "21/2/2031",
  symptoms: "Meow Meow Meow",
  description: "I am a cat. Meow Desu."
}


const MedicalHistoryView = () => {
    let isAlertActive = 0;
    const navigation = useNavigation()
    const theme = useTheme();
    const LeftContent = props => <Avatar.Icon {...props} icon="needle" />
    const RightContent = props => <View marginRight="auto"><IconButton iconColor='red' icon="minus-circle" onPress={() => deleteRecord(props)}/></View>

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
          style = {{...styles.fab}}     
          onPress= {() => navigation.navigate("MedicalHistory", {operation : "add"})}
          />
        <View style = {styles.root}>
          <ScrollView>
          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title key = {1} titleStyle={{fontSize:24, minHeight:'auto'}} 
                        title="Diabetes" subtitle="Status: Ongoing" 
                        left={LeftContent} right={RightContent}/>
            <Card.Content>
              <Paragraph>Symptoms: Looking at a Photo of Abbas with his hair down.</Paragraph>
              <Paragraph>Have attempted self-treatment by performing an excorcism and cleansing of the soul. No effect.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("MedicalHistory", {operation : "edit", recordDetails: details})} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>

          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:24, minHeight:'auto'}} title="Stage-3 Brain Cancer" subtitle="Status: Recovered" left={LeftContent} right={RightContent}/>
            <Card.Content>
              <Paragraph>Symptoms: Constant headaches and butt pains. Feel really tired and sleepy.</Paragraph>
              <Paragraph>Problems began due to listening to my friends babble about retarded shit all the time. I am recovered now because I am home.</Paragraph>
            </Card.Content>
            <Card.Actions>
  
              <Button  onPress={() => navigation.navigate("MedicalHistory", {operation : "edit"})} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>

          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:24, minHeight:'auto'}} title="Knee Surgery" subtitle="Status: Recovered" left={LeftContent}  right={RightContent} />
            <Card.Content>
              <Paragraph>Symptoms: Unable to walk on my right knee. Constant throbbing in my knee-cap.</Paragraph>
              <Paragraph>I suspect that my Kneecap has been fractured. Collided hard with a Bear while playing Soccer in the Artic. Included X-ray images for reference.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("MedicalHistory", {operation : "edit"})} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>

          <View style={{paddingBottom:75}}></View>
          </ScrollView>
        </View>
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