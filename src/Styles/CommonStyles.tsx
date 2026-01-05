import { StyleSheet } from "react-native";

export default StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: '#f3f6fc'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    backgroundImage: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    allScreenBackImage: {
        width: '100%',
        aspectRatio: 1,
        marginTop: -210,
    },
    greetingText: {
        color: '#FFF',
        fontSize: 16,
    },
    homePageButtons: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homePageButtonText: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 10
    }
})