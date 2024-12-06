import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import UserProvider from '../../assets/icons/UserProvider.svg';
import ButtonsPS from '../../components/ButtonsPS';

const UserProviderScreen = () => {

    const { updateAuthState } = useContext(AuthContext);

    const updateState = (val) => {
        updateAuthState(val);
    }

    return (
        <View style={styles.containerM}>
            <View style={styles.containerC}>
                <View style={styles.imgTxt}>
                    <View style={styles.imgContainer}>
                        <UserProvider />
                    </View>

                    <Text style={styles.infoTxt}>
                        Continue As
                    </Text>
                </View>

                <TouchableOpacity style={styles.btns} onPress={() => updateState(true)}>
                    <ButtonsPS title="USER" />
                </TouchableOpacity>

                <Text style={styles.infoTxt}>
                    Or
                </Text>

                <TouchableOpacity style={styles.btns} onPress={() => updateState(false)}>
                    <ButtonsPS title="SERVICE PROVIDER" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserProviderScreen

const styles = StyleSheet.create({
    containerM: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },

    imgContainer: {
        width: "100%",
        alignItems: "center"
    },

    containerC: {
        width: "100%",
        height: "80%",
        justifyContent: "center"
    },

    infoTxt: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 20,
        textAlign: "center",
        margin: 25,
    },

    btns: {
        width: "90%",
        alignSelf: "center"
    },

    imgTxt: {
        margin: 40
    }
})