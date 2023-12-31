import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../../screens/Customer/CategoryScreen';

export default function SharedStackU() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Category" component={CategoryScreen} />
        </Stack.Navigator>
    )
}