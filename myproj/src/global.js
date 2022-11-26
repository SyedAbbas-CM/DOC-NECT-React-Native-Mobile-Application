import { StyleSheet } from "react-native"
import { TouchableWithoutFeedback, Keyboard } from "react-native";

export const globalStyles = StyleSheet.create({
    root : {
        padding : 20,
    },
    input : {
        // marginVertical:10, 
        backgroundColor : "white"
    },
    button : {
        marginVertical:10,
        borderRadius: 5
    },
    centerChildren : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    }
});

export const WrapWithKeyboardDismiss = (component) => {
  return (
    () =>{
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {component()}
            </TouchableWithoutFeedback>
        )
    }
  );
}
