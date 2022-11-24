import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme  } from 'react-native-paper';
import React , {useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const LeftContent = props => <Avatar.Icon {...props} icon="needle" />

const MedicalHistoryView = () => {
    const navigation = useNavigation()
    const theme = useTheme();

    return (  
      <ScrollView>
        <View style = {styles.root}>
          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:24, minHeight:'auto'}} title="Diabetes" subtitle="Status: Ongoing" left={LeftContent} />
            <Card.Content>
              <Paragraph>Symptoms: Looking at a Photo of Abbas with his hair down.</Paragraph>
              <Paragraph>Have attempted self-treatment by performing an excorcism and cleansing of the soul. No effect.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("MedicalHistory")} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>

          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:24, minHeight:'auto'}} title="Stage-3 Brain Cancer" subtitle="Status: Recovered" left={LeftContent} />
            <Card.Content>
              <Paragraph>Symptoms: Constant headaches and butt pains. Feel really tired and sleepy.</Paragraph>
              <Paragraph>Problems began due to listening to my friends babble about retarded shit all the time. I am recovered now because I am home.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("MedicalHistory")} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>

          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:24, minHeight:'auto'}} title="Knee Surgery" subtitle="Status: Recovered" left={LeftContent} />
            <Card.Content>
              <Paragraph>Symptoms: Unable to walk on my right knee. Constant throbbing in my knee-cap.</Paragraph>
              <Paragraph>I suspect that my Kneecap has been fractured. Collided hard with a Bear while playing Soccer in the Artic. Included X-ray images for reference.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("MedicalHistory")} mode="text" textColor={theme.colors.primary}>Edit</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    );
}
 
export default MedicalHistoryView;


const styles = StyleSheet.create({
  root : {
    flex:1,
    paddingTop: 5,
    paddingBottom: 80,
  },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    button : {
      width: 20,
      borderRadius: 0
    }, 
    card : {
      marginLeft: 5,
      marginRight: 8,
      marginTop: 10
    }
})