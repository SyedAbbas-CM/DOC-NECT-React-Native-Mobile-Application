import { View ,Image,StyleSheet, TouchableOpacity} from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper';
import DoctorImage from '../../assets/doctor.png';
import UserImage from '../../assets/user.png';
import { globalStyles } from '../global';

export default RegisterSelect = ({ onSelect }) => {
    return (
        <View style={[globalStyles.root, styles.background]}>
            <View style={globalStyles.centerChildren}>
                <Text variant='headlineSmall' style={styles.title}>Register as User</Text>

                <TouchableOpacity style={[styles.imageBackground, { backgroundColor: "#3796f3" }]} onPress={() => onSelect("user")}>
                    <Image style={styles.image}
                        source={UserImage} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <View style={globalStyles.centerChildren}>
                <Text variant='headlineSmall' style={styles.title}>Register as Professional</Text>

                <TouchableOpacity style={[styles.imageBackground, { backgroundColor: "orange" }]} onPress={() => onSelect("doctor")}>
                    <Image style={styles.image}
                        source={DoctorImage} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
  title : {
    fontWeight : "bold",
    marginVertical : 20
  },  
  background : {
    display : "flex",
    alignItems : "center",
    justifyContent : "space-evenly",
    flex : 1
  },
  image : {
    marginLeft : 'auto',
    marginRight : 'auto',
    marginBottom : 'auto',
    marginTop : 'auto',
    width : '90%',
    height : undefined,
    aspectRatio : 1,
  },
  imageBackground : {

    borderColor : "black", 
    borderWidth : 4,
    borderRadius : 10,
    backgroundColor: '#3796f3',
    width : "50%",
    height : undefined,
    aspectRatio : 1
  }
})