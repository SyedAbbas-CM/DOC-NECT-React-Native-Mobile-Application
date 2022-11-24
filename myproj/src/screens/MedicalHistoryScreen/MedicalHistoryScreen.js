import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from 'react-native'
import React ,{useState, useCallback} from 'react'
import { Text, TextInput, Button, Title, Paragraph,  SegmentedButtons, FAB, useTheme} from 'react-native-paper';

const MedicalHistoryScreen = () => {
  const theme = useTheme();

    return ( 
        <View style = {{...styles.root}}>
          <View style = {{...styles.row, ...styles.custom_card, backgroundColor: theme.colors.primary}}>
              <Title style = {{...styles.centerX, color:"white"}}>Update Medical Record History</Title>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style = {{...styles.row, ...styles.custom_card}}>
              <Text variant='bodyLarge'>Title </Text>
              <TextInput style = {{...styles.input}}></TextInput>
            </View>

            <View style = {{...styles.row, ...styles.custom_card}}>
              <Text variant="bodyLarge" style={{paddingBottom:5}}>Current Status </Text>
              <View style = {{width:'100%', flexDirection:'row'}}>
                <View style={{width:'50%', paddingRight:10}}>
                  <Text>Start Date </Text>
                  <TextInput style = {{...styles.input}}></TextInput>
                </View>
                <View style={{width:'50%', paddingLeft:10}}>
                  <Text>End Date </Text>
                  <TextInput style = {{...styles.input}}></TextInput>
                </View>
              </View>
              <Text variant='bodySmall'>*Leave end date empty if ongoing</Text>
            </View>

            <View style = {{...styles.row, ...styles.custom_card}}>
              <Text variant="bodyLarge">Symptoms </Text>
              <TextInput numberOfLines={3} multiline style = {{...styles.input}}></TextInput>
            </View>

            <View style = {{...styles.row, ...styles.custom_card}}>
              <Text variant="bodyLarge">Description </Text>
              <TextInput numberOfLines={5} multiline style = {{...styles.input}}></TextInput>
            </View>

            <Button mode="contained" style={{...styles.button}}>
              Submit
            </Button>
          </ScrollView>
        </View>
     );
}
 
export default MedicalHistoryScreen;

const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop:50,
      paddingBottom: 15,
      paddingRight: 15,
      paddingLeft: 15,
      elevation: 2
    },
    input : {
      marginVertical:10, 
      backgroundColor : "#ebf2fc",
      color : 'gray',
      shadowColor: '#0000cc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    button : {
      marginVertical:10,
      borderRadius: 5
    },
    row : {
      paddingTop: 12,
      paddingBottom: 12
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
    },
    custom_card: {
      shadowColor: '#0000cc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 4,
      backgroundColor: "white",
      padding:5,
      marginTop: 10,
      marginBottom: 10
    }
  })