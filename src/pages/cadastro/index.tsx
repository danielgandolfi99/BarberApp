import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { View } from "react-native";
import ButtonStyled from "../../components/ButtonStyled";

const Cadastro = () => {
    const navigation = useNavigation();

    const handleReturn = () => {
        navigation.goBack();
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ButtonStyled name="Voltar" onPress={handleReturn} />
        </View>
    )
}
export default Cadastro;