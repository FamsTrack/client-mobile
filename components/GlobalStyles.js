import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        paddingTop: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        left: 60,
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').height / 2
    }
})
