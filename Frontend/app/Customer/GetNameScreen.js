import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import InputF from '../../components/InputF'
import ButtonsPS from '../../components/ButtonsPS'
import AuthContext from '../../context/AuthContext'

const GetNameScreen = () => {

    const { updateLoginStateU } = useContext(AuthContext);

    const updateState = (val) => {
        updateLoginStateU(val)
    }

    return (
        <View style={styles.containerM}>
            <View style={styles.container}>
                <Text style={styles.infoTxt}>Enter your Name</Text>
                <InputF />
                <TouchableOpacity onPress={() => updateState(true)}>
                    <ButtonsPS title={"Login"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GetNameScreen


const styles = StyleSheet.create({
    containerM: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    container: {
        width: "90%",
        height: "40%",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
    },

    infoTxt: {
        textAlign: "center",
        fontFamily: "Inter_700Bold",
        fontSize: 20

    }
})