import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import OTPIcon from '../../assets/icons/OTPIcon.svg'
import { useNavigation } from '@react-navigation/native'
import ButtonsPS from '../../components/ButtonsPS'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import loginServices from '../../api/login'


const CELL_COUNT = 6;

const OTPScreen = (props) => {

	const {route} = props 

    const navigation = useNavigation()

    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    console.log(value);

    const checkOTP = async () => {
		
		try {

			const user = await loginServices.user({phone: route.params.phone, userOtp: value})
			await AsyncStorage.setItem('loggedUser', JSON.stringify(user))
			AsyncStorage.getItem('loggedUser')
						.then(value => {
							console.log(value)
						})
			navigation.navigate("Get-Name")

		}
		catch (error) {
			console.log(error)
		}

    }



    return (
        <View style={styles.containerM}>
            <View style={styles.topView}>
                <OTPIcon />

                <Text style={[styles.topTxt, { margin: 25, fontSize: 20 }]}>OTP</Text>

                <Text style={styles.topTxt}>Enter the OTP you recieved and complete the process</Text>
            </View>


            <View style={styles.btmView}>

                <View style={{ width: "85%" }}>

                    <CodeField
                        ref={ref}
                        {...propss}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                </View>

                <Text style={styles.btmTxt}>Didn’t receive an OTP ?</Text>

                <TouchableHighlight style={[styles.btmTxt]}>
                    <Text style={styles.rOTP}>
                        Resend OTP
                    </Text>
                </TouchableHighlight>

                <View style={{ width: "100%", alignItems: "center", margin: 25 }}>
                    <TouchableOpacity style={styles.btns} onPress={checkOTP}>
                        <ButtonsPS title="Submit" />
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    containerM: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#407BFF",
    },

    btns: {
        width: "50%"
    },

    topTxt: {
        color: "#fff",
        fontFamily: "Inter_700Bold"
    },

    btmTxt: {
        color: "#000",
        margin: 15
    },

    btmView: {
        width: "100%",
        height: "55%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 140,
        alignItems: "center",
        justifyContent: "center"
    },

    rOTP: {
        textDecorationLine: "underline"
    },

    topView: {
        width: "100%",
        height: "45%",
        alignItems: "center",
        justifyContent: "center"
    },

    root: {
        flex: 1,
        padding: 20
    },

    title: {
        textAlign: 'center',
        fontSize: 30
    },

    codeFieldRoot: {
        marginTop: 20
    },

    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },

    focusCell: {
        borderColor: '#000',
    },

})