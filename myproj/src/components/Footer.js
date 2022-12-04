import { View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default Footer = ({ routeName }) => {
    const navigation = useNavigation();
    const shouldDisplay = () => {
        return ["HomeScreen",
                "Settings",
                "Profile"].includes(routeName);
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around", borderTopColor: '#c4c4c4', borderTopWidth: 1, display: shouldDisplay() ? "flex" : "none" }}>
            
            <IconButton
                icon={routeName === "HomeScreen" ? "home" : "home-outline"}
                size={25}
                onPress = {() => navigation.navigate("HomeScreen")}
            />

            <IconButton
                icon={routeName === "Settings" ? "cog" : "cog-outline"}
                size={25}
                onPress={() => navigation.navigate("Settings")}
            />

        </View>
    );
};
