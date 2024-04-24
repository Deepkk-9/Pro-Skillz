import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CartCards from '../../components/CartCards';
import { Ionicons } from '@expo/vector-icons';
import { Button, CheckBox } from 'react-native-elements';
import CheckoutButton from '../../components/CheckoutButton';
import CartContext from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import LocationContext from '../../context/LocationContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "@env";

const CartScreen = () => {
    const [isChecked, setChecked] = useState(false);

    const { cart, getAllServicesFromCart } = useContext(CartContext);

    const { location } = useContext(LocationContext);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || selectedTime;
        setShowTimePicker(false);
        setSelectedTime(currentTime);
    };



    useEffect(() => {
        getAllServicesFromCart();
    }, [])

    const navigation = useNavigation();

    const handleReview = async () => {
        // navigation.navigate("ServiceReview");

        const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedUser"));

        // console.log("This is cart ", cart.services);
        // console.log([selectedDate.toDateString() + " " + selectedTime.toLocaleTimeString()]);

        try {

            const response = await fetch(`${API_HOST}/api/bookedService`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG.token}`
                },
                body: JSON.stringify(
                    {
                        "services": cart.services,
                        "payment": "paymentIdWillBeAdded",
                        "deliveryDates": [selectedDate.toDateString() + " " + selectedTime.toLocaleTimeString()],
                        "status": "Pending"
                    }
                )
            });

            const orderDtls = await response.json();
            console.log(orderDtls);

            if (orderDtls) {
                Alert.alert('Order Successful', 'Your order has been placed successfully!');
                navigation.navigate("Home")
            } else {
                Alert.alert('Order Failed', 'There was an error processing your order. Please try again later.');
            }
        }
        catch (err) {
            console.log("Some error occured : ", err.message);
        }

    }

    const handleNoItemcartBtn = () => {
        navigation.navigate("Home");
    }

    if (Object.keys(cart).length === 0) {
        return (
            <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
                <Ionicons name='cart-outline' size={50} color="#3B37FF" />
                <Text>Cart is Empty!</Text>
                <TouchableOpacity style={styles.btn} onPress={handleNoItemcartBtn}>
                    <Text>
                        Explore Services
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (cart.services.length === 0) {
        return (
            <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
                <Ionicons name='cart-outline' size={50} color="#3B37FF" />
                <Text>Cart is Empty!</Text>
                <TouchableOpacity style={styles.btn} onPress={handleNoItemcartBtn}>
                    <Text>
                        Explore Services
                    </Text>
                </TouchableOpacity>
            </View>
        )

    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                        cart.services.map((item, index) => {
                            return <CartCards item={item} key={index} />
                        })
                    }

                </View>

                <CheckBox
                    title='Avoid calling Before reaching location'
                    checked={isChecked}
                    onPress={() => setChecked(!isChecked)}
                    checkedColor='#3B37FF'
                    containerStyle={{
                        backgroundColor: "#fff",
                        width: "100%",
                        marginLeft: 0,
                        paddingVertical: 15,
                        borderRadius: 10,
                        marginVertical: 15
                    }}
                />

                <View style={styles.payCont}>

                    <View>
                        <TouchableOpacity style={styles.datetimeBtn} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.datetimeTxt}>
                                Select Date
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.datetimeBtn} onPress={() => setShowTimePicker(true)}>
                            <Text style={styles.datetimeTxt}>
                                Select Time
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="time"
                                display="default"
                                onChange={onChangeTime}
                            />
                        )}

                        <Text style={{ marginVertical: 10, fontSize: 15, fontWeight: "400" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Scheduled for : {"\n"}
                            </Text>
                            Date : {selectedDate.toDateString()} {"\n"}
                            Time : {selectedTime ? selectedTime.toLocaleTimeString() : 'Not selected'}
                        </Text>
                    </View>


                    <Text style={styles.txt}>
                        Payment Summary
                    </Text>

                    <View>
                        <View style={styles.paymentCont}>
                            <Ionicons name='reader' size={20} style={{ marginRight: 10 }} color="#3B37FF" />
                            <Text>
                                Total Bill  <Text style={{ fontWeight: "bold" }}>₹{cart.totalPrice}</Text>
                            </Text>
                        </View>

                        <View style={styles.divider}></View>

                        <View style={styles.paymentCont}>
                            <Ionicons name='home' size={20} color="#3B37FF" style={{ marginRight: 10 }} />
                            <Text numberOfLines={2} style={{ width: "85%" }}>
                                {location[0].formattedAddress}
                            </Text>
                            <Ionicons name='chevron-forward' size={20} color="#3B37FF" />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleReview}>
                <CheckoutButton />
            </TouchableOpacity>
        </View>
    )
}


export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        position: "relative"
    },
    txt: {
        textDecorationLine: "underline",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10
    },
    payCont: {
        marginBottom: "50%",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 16,
        borderRadius: 10
    },
    paymentCont: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    divider: {
        borderWidth: 0.2,
        borderColor: "#ddd",
        marginVertical: 5
    },
    checkoutBtn: {
        position: "absolute",
        alignSelf: "center",
        bottom: "12%",
    },
    btn: {
        borderWidth: 1,
        borderColor: "#3B37FF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#EEEEFF",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    datetimeBtn: {
        backgroundColor: "#3B37FF",
        marginVertical: 5,
        borderRadius: 7,
    },
    datetimeTxt: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        marginVertical: 10
    }
})