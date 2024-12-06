import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ModalEditName from '../../components/ModalEditName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';

const UserProfileScreen = () => {


    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('User');
    const { directLogin, updateDirectLogin, updateAuthState, updateLoginStateU } = useContext(AuthContext);

    const handleSaveName = (newName) => {
        setName(newName);
    }

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("loggedUser");
        updateLoginStateU(false)
        updateAuthState(null);
        updateDirectLogin(null);

        console.log(directLogin);
    };

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: "100%", width: "100%", zIndex: 10, display: isModalVisible ? "block" : 'none' }}>

            </View>
            <View style={styles.headerCont}>
                <View style={styles.userCard}>
                    <Image source={require("../../assets/prouser.png")} alt='user img' />
                    <View style={styles.editName}>
                        <Text style={
                            {
                                marginVertical: 10,
                                fontSize: 22,
                                marginRight: 10
                            }}>
                            {name}
                        </Text>
                        <Ionicons name="create" size={30} color="#3B37FF" onPress={() => setModalVisible(true)} />
                        <ModalEditName
                            visible={isModalVisible}
                            onClose={() => setModalVisible(false)}
                            currentName={name}
                            onSave={handleSaveName}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.opts}>
                <TouchableOpacity style={styles.lists}>
                    <Ionicons name="list-circle" size={25} color="#fff" style={styles.logos} />
                    <Text style={styles.txt}>My Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lists}>
                    <Ionicons name="document-lock" size={25} color="#fff" style={styles.logos} />
                    <Text style={styles.txt}>Privacy policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lists} onPress={handleLogOut}>
                    <Ionicons name="log-out" size={25} color="#fff" style={styles.logos} />
                    <Text style={styles.txt}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    headerCont: {
        backgroundColor: "#3B37FF",
        height: "18%",
        position: "relative",
        zIndex: 5,
    },
    userCard: {
        backgroundColor: "#fff",
        width: "90%",
        height: "150%",
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "25%",
        elevation: 2
    },
    txt: {
        fontSize: 16
    },
    opts: {
        marginTop: "25%",
        padding: 20,
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
    editName: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})