import { View ,Image, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme  } from 'react-native-paper';
import React , {useState} from 'react'

const CommentIcon = props => <Avatar.Icon {...props} icon="comment" />
const PostIcon = props => <Avatar.Icon {...props} icon="note" />

const ActivityView = ({userActivity}) => {
    const theme = useTheme();

    return ( 
      <>
      {userActivity.length >= 1 ? <View style = {styles.root}>
        <ScrollView>
          {Object.keys(userActivity).map((key, index) => 
              <Card key={index} elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
                <Card.Title titleStyle={{fontSize:20, minHeight:'auto'}} title={userActivity[key].title} left={CommentIcon} 
                            subtitle={"Category: " + userActivity[key].category}/>
                <Card.Content>
                  <Paragraph>{userActivity[key].body}</Paragraph>
                </Card.Content>
              </Card>)}
        </ScrollView>
      </View> :
        <View style={styles.root}>
        <Text style={{...styles.center}}>No Activity Found</Text>
      </View>
      }
      </>
     );
}
 
export default ActivityView;


const styles = StyleSheet.create({
  root : {
    flex:1,
    paddingBottom: 80,
  },
  centerX : {
    marginLeft : 'auto', 
    marginRight : 'auto'
  },
  card : {
    marginLeft: 5,
    marginRight: 8,
    marginTop: 10
  },
  center : {
    marginLeft : 'auto', 
    marginRight : 'auto',
    marginTop : 'auto',
    marginBottom: 'auto'
  },
})