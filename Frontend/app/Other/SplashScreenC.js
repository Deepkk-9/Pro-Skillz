// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreenC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Simulate some loading or initial setup if needed
        setTimeout(() => {
            // navigation.navigate('User');
        }, 2000); // Navigate to decision screen after 2 seconds
    }, [navigation.navigate()]);

    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    );
};

export default SplashScreenC;
