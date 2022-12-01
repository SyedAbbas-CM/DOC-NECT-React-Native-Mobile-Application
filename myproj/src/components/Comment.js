import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default Comment = ({userName, body, upvotes, children, level}) => {
    const editComment = () => {
    }
    const deleteComment = () => {   
    }
    return (
        <View>
            <View style = {{flexDirection : "row", alignItems : "center"}}>
                <IconButton icon="account-circle" size={25}/>
                <Text variant="titleMedium">{userName}</Text>
            </View>
            <Text style= {{paddingHorizontal : 20}}>{body}</Text>
            <View style = {{flexDirection : "row", backgroundColor : 'transparent', marginLeft : 'auto'}}>
                <IconButton icon="dots-vertical"/>
                <View style = {{flexDirection : "row", alignItems : 'center', marginHorizontal : 10}}>
                    <IconButton icon="reply-outline" size={25}/>
                    <Text style ={{fontWeight : 'bold', color : 'gray'}}>Reply</Text>
                </View>
                <View style = {{flexDirection : "row", alignItems : 'center', marginRight : 10}}>
                    <IconButton icon="arrow-up-bold-outline" size={20}/>
                    <Text variant="titleMedium" style ={{fontWeight : 'bold', color : 'gray'}}>{upvotes}</Text>
                    <IconButton icon="arrow-down-bold-outline" size={20}/>
                </View>
            </View>
            {React.Children.count(children) !== 0  &&
                <View style = {{marginLeft : (level + 1) * 10, borderLeftColor : '#c4c4c4', borderLeftWidth : 1}}>
                    {children}
                </View>
            }
        </View>
    );
}