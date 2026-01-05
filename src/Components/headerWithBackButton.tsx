import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '@utils/normaliseFont';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const HeaderWithBackButton = ({ label }: any) => {

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const buttonSize = Math.round(Math.min(screenWidth, screenHeight) * 0.09);
    const iconSize = Math.round(buttonSize * 0.6);
    const navidation = useNavigation()

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center', alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 10
        }}>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => navidation.goBack()}>
                <Feather name="arrow-left" size={iconSize} color="#18a2d2" />
            </TouchableOpacity>
            <Text style={{ fontSize: normalize(14), color: '#000', fontFamily: 'regular' }}>{label}</Text>
        </View>
    )
}

export default HeaderWithBackButton