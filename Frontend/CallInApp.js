import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './context/AuthContext';
import UserProviderOpt from './screens/Other/UserProviderOpt';
import MainStackU from './routes/user/MainStackU';
import MainStackP from './routes/provider/MainStackP';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CallInApp = () => {


    const { directLogin, updateDirectLogin } = useContext(AuthContext);

    useEffect(() => {
        async function check() {
            if (await AsyncStorage.getItem("loggedUser") != null) {
                updateDirectLogin(true);
                const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedUser"));
                console.log(tokenG.token);
            }
            else if (await AsyncStorage.getItem("loggedServiceProvider") != null) {
                updateDirectLogin(false);
                const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedServiceProvider"));
                console.log(tokenG.token);
            }
        }
        check();

    }, [])

	// directLogin = true
    const checkLoggedInOrNot = () => {
        if (directLogin == null) {
            return (
                <UserProviderOpt />
            )
        }
        else if (true) {
            return (
                <MainStackU />
            )
        }
        else if (directLogin == false) {
            return (
                <MainStackP />
            )
        }
    }

    return (
        <>
            {checkLoggedInOrNot()}
        </>
    )
}

export default CallInApp

const styles = StyleSheet.create({})