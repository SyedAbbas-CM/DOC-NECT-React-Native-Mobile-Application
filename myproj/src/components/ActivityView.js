import { View ,Image, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, useTheme  } from 'react-native-paper';
import React , {useState} from 'react'

const CommentIcon = props => <Avatar.Icon {...props} icon="comment" />
const PostIcon = props => <Avatar.Icon {...props} icon="note" />

const ActivityView = () => {
    const theme = useTheme();

    return ( 
        <View style = {styles.root}>
          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:20, minHeight:'auto'}} title="Do I need Surgery?" left={CommentIcon} />
            <Card.Content>
              <Paragraph>Bruh you do not need surgery. Go to Abbas sensei and have him do his signature massage.</Paragraph>
            </Card.Content>
          </Card>

          <Card elevation={1} style = {{...styles.card, borderWidth:1, borderColor:"#007fff"}}>
            <Card.Title titleStyle={{fontSize:20, minHeight:'auto'}} title="Problems down there" left={PostIcon} />
            <Card.Content>
              <Paragraph>I am experiancing discomfort in my nether regions. My loins. My privates. My crown jewels. My precious. Please advise what to do. I am....</Paragraph>
            </Card.Content>
          </Card>

        </View>
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
  }
})