import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLoginSignUp from '../../app/Customer/UserLoginSignUp';
import OTPScreen from '../../app/Customer/OTPScreen';
import GetNameScreen from '../../app/Customer/GetNameScreen';
import AuthContext from '../../context/AuthContext';
import MainStackU from '../user/MainStackU';

export default function AuthStackU() {

    const { afterLoginU } = useContext(AuthContext);

    const Stack = createNativeStackNavigator();

    if (afterLoginU) {
        return (
            <MainStackU />
        )
    }
    else if (!afterLoginU) {
        return (
            <Stack.Navigator initialRouteName='Login-SignUp' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login-SignUp" component={UserLoginSignUp} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                {/* <Stack.Screen name="Get-Name" component={GetNameScreen} /> */}
            </Stack.Navigator>
        )
    }
}