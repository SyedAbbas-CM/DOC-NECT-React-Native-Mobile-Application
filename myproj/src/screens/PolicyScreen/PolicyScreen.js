import { View ,Image, ScrollView, StyleSheet} from 'react-native'
import React ,{useState, useCallback} from 'react'
import { Icon, Text, TextInput, Button, Title, Paragraph} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PolicyScreen = () => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }


    return ( 
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingBottom: 30}}>
                    <Title style={{fontSize:28}}>Terms and Conditions</Title>
                </View>
            
                <View>
                    <Paragraph style={styles.paragraph}>
                        By using our App, you agree to the following terms and conditions list below. 
                    </Paragraph>

                    <Paragraph style={styles.paragraph}>
                        1. Users are fully responsible for themselves, and any advice they choose to follow. 
                        This App merely exists as a platform for Users and Medical Experts to interact. 
                        We are not responsible for moderating these interactions.
                    </Paragraph>

                    <Paragraph style={styles.paragraph}>
                        2. Users will enagage only in relevant discussion regarding Health-related issues. 
                    </Paragraph>

                    <Paragraph style={styles.paragraph}>
                        3. Users accept that we reserve the remove you from our platform, 
                        without being required to disclose any reason.
                    </Paragraph>

                    <Paragraph style={styles.paragraph}>
                        4. Users will not share or submit any incorrect information (e.g, fake certification details or faked medical records)
                    </Paragraph>

                    <View style={{paddingBottom: 30, paddingTop: 30}}>
                        <Title style={{fontSize:24}}>Policy</Title>

                        <Paragraph style={styles.paragraph}>
                            Sensitive User Information will remain anonymous and secure. 
                            Personal information will not be shared with any third-parties.
                            Anonymous medical information may be shared with relevant third parties
                        </Paragraph>
                    </View>
                </View>
                <Button onPress={goBack}>
                    Go Back
                </Button>
            </ScrollView>
        </View>
     );
}
 
export default PolicyScreen;


const styles = StyleSheet.create({
    root : {
      flex:1,
      marginTop: 30,
      marginLeft: 15,
      marginRight: 15,
    },
    scrollview: {
        padding: 2, 
        elevation:1, 
        shadowRadius:4, 
        shadowOffset:3    
    },
    button : {
      marginVertical:10,
      borderRadius: 5
    },
    centerX : {
      marginLeft : 'auto', 
      marginRight : 'auto'
    },
    paragraph: {
        paddingTop: 10, 
        paddingBottom: 10
    }
})