import { View, Text, TouchableOpacity, StyleSheet, ScrollView, LogBox, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SignUpP from '../../assets/icons/SignUpP.svg'
import InputF from '../../components/InputF'
import ButtonsPS from '../../components/ButtonsPS'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../context/AuthContext'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import LocationContext from '../../context/LocationContext';
import { API_HOST } from "@env";

LogBox.ignoreAllLogs();

const SignUp = () => {

    console.log(API_HOST);

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const { setLongLat, longLat } = useContext(LocationContext);

    useEffect(() => {
        const checkLocationPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'denied') {
                Alert.alert('Allow Location access to sign up as Service Provider');
                navigation.goBack();
            }

            const enabled = await Location.hasServicesEnabledAsync();

            if (!enabled) {
                navigation.goBack();
            }

            let locationC = await Location.getCurrentPositionAsync({});

            setLongLat([locationC.coords.latitude, locationC.coords.longitude])

        };

        const getAllCategoriesName = async () => {
            try {
                const response = await fetch(`${API_HOST}/api/serviceCategory?action=name`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const allCategoriesName = await response.json();

                const catName = allCategoriesName.map(val => ({
                    label: val.name,
                    value: val.name
                }));

                setItems(catName);
            } catch (err) {
                console.log("Get all Categories error : ", err.message);
            }
        };

        checkLocationPermissions();
        getAllCategoriesName();
    }, [navigation]);

    const updateState = async () => {
        try {
            const response = await fetch(`${API_HOST}/api/serviceProvider`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "firstname": firstName,
                        "lastname": lastName,
                        "phone": phone,
                        "email": email,
                        "password": password,
                        "categories": [category],
                        "coordinates": longLat
                    }
                )
            });

            const authSPCheck = await response.json();

            console.log(authSPCheck);

            if (authSPCheck) {
                Alert.alert("Successfully Regsitered now Login!")
                navigation.navigate("Login")
            }
        }
        catch (err) {
            console.log("Some error occured : ", err.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerM}>
                <ScrollView contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <SignUpP />
                    <Text style={styles.txt}>SignUp</Text>

                    <View>
                        <View style={styles.inpF}>
                            <InputF title="First Name" value={firstName} onChangeText={setFirstName} />
                        </View>
                        <View style={styles.inpF}>
                            <InputF title="Last Name" value={lastName} onChangeText={setLastName} />
                        </View>
                        <View style={styles.inpF}>
                            <InputF title="Phone" inpM="tel" value={phone} onChangeText={setPhone} />
                        </View>
                        <View style={styles.inpF}>
                            <DropDownPicker
                                style={{ backgroundColor: "transparent" }}
                                placeholder='Category'
                                placeholderStyle={{ opacity: 0.55, marginLeft: 7 }}
                                open={open}
                                value={category}
                                items={items}
                                setOpen={setOpen}
                                setValue={setCategory}
                                setItems={setItems}
                            />
                        </View>
                        <View style={styles.inpF}>
                            <InputF title="Email" inpM="email" value={email} onChangeText={setEmail} />
                        </View>
                        <View style={styles.inpF}>
                            <InputF title="Password" password={true} value={password} onChangeText={setPassword} />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => updateState()}>
                        <ButtonsPS title="Sign Up" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text style={styles.txtL}>
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },

    containerM: {
        width: "90%",
        height: "100%",
    },

    inps: {
        borderWidth: 10,
    },

    inpF: {
        marginTop: 7,
        marginBottom: 7,
        position: "relative"
    },

    btn: {
        marginTop: 7,
        marginBottom: 7
    },

    txt: {
        textAlign: "center",
        fontFamily: "Inter_700Bold",
        fontSize: 27,
        margin: 10
    },

    txtL: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15
    }

})