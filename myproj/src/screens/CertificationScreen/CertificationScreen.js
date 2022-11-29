import { useNavigation } from "@react-navigation/native";
import { CertificationForm } from "../../components/CertificationForm";

export default CertificationScreen = () => {
    const navigation = useNavigation();
    const onCertify = (formData) => {
        navigation.navigate("signIn")
    }
    return (
        <CertificationForm results={ onCertify } />
    );
}