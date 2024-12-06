import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AuthContext from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {

    const { updateDirectLogin, updateAuthState, updateLoginStateS } = useContext(AuthContext);

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("loggedServiceProvider");
        updateLoginStateS(false)
        updateAuthState(null);
        updateDirectLogin(null);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>

            <TouchableOpacity style={styles.lists} onPress={handleLogOut}>
                <Ionicons name="log-out" size={25} color="#fff" style={styles.logos} />
                <Text style={styles.txt}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20
    },
    txt: {
        fontSize: 16
    },
    lists: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 2,
    },
    logos: {
        padding: 10,
        backgroundColor: "#3B37FF",
        borderRadius: 100,
        marginRight: 20
    },
})