import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../app/Provider/Login';
import SignUp from '../../app/Provider/SignUp';
import { useContext } from 'react';
import MainStackP from '../provider/MainStackP';
import AuthContext from '../../context/AuthContext';

const AuthStackSP = () => {
    const Stack = createNativeStackNavigator();

    const { afterLoginS } = useContext(AuthContext);

    if (afterLoginS) {
        return (
            <MainStackP />
        )
    }
    else if (!afterLoginS) {
        return (
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        )
    }
}

export default AuthStackSP