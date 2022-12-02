import { View ,Image, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme, Text  } from 'react-native-paper';
import React , {useContext, useState} from 'react'
import { themeContext } from '../context';

const CommentIcon = props => <Avatar.Icon {...props} icon="comment" />
const PostIcon = props => <Avatar.Icon {...props} icon="note" />

const ActivityView = ({userActivity}) => {
    const { theme } = useContext(themeContext);
    const styles = createStyles(theme);

    return ( 
      <>
      {userActivity.length >= 1 ? <View style = {styles.root}>
        <ScrollView>
          {Object.keys(userActivity).map((key, index) => 
              <Card key={index} elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
                <Card.Title titleStyle={{fontSize:20, minHeight:'auto', ...styles.heading}} 
                            title={userActivity[key].title} left={CommentIcon} 
                            subtitleStyle={{...styles.text_small}}
                            subtitle={"Category: " + userActivity[key].category}/>
                <Card.Content>
                  <Paragraph style={{...styles.text_small}}>{userActivity[key].body}</Paragraph>
                </Card.Content>
              </Card>)}
        </ScrollView>
      </View> :
        <View style={styles.root}>
        <Text style={{...styles.center, ...styles.text_small}}>No Activity Found</Text>
      </View>
      }
      </>
     );
}
 
export default ActivityView;


const createStyles = ({colors}) => StyleSheet.create({
  root : {
    flex:1,
    backgroundColor: colors.primaryContainer
  },
  centerX : {
    marginLeft : 'auto', 
    marginRight : 'auto'
  },
  card : {
    marginLeft: 5,
    marginRight: 8,
    marginTop: 10,
    backgroundColor: colors.onPrimaryContainer
  },
  center : {
    marginLeft : 'auto', 
    marginRight : 'auto',
    marginTop : 'auto',
    marginBottom: 'auto'
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
})