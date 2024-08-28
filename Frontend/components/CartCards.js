import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CartContext from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { API_HOST } from "@env";

const CartCards = ({ item }) => {

    const [serviceCard, setServiceCard] = useState();

    const { removeFromCart, } = useContext(CartContext);

    // console.log(API_HOST)
    console.log(API_HOST);

    useEffect(() => {
        const getCartServiceInfo = async (service_id) => {
            try {
                const response = await fetch(`${API_HOST}/api/service/${service_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const getService = await response.json();

                setServiceCard(getService);
            }
            catch (err) {
                console.log("Get Cart Service info error : ", err.message);
            }
        }
        getCartServiceInfo(item);
    }, [])

    if (!serviceCard) {
        return <View></View>
    }

    const handleRemoveFromCart = () => {
        removeFromCart(item)
    }

    const navigation = useNavigation();

    console.log(serviceCard);


    return (
        <View style={styles.cardCont}>
            <View style={{ flex: 1, }}>

                {/* <Image style={styles.cardImg} source={require("../assets/idli.png")} alt='service img' /> */}
                <Image style={styles.cardImg} source={{ uri: `data:${serviceCard.image.contentType};base64,${serviceCard.image.data}` }} alt='category banner' resizeMode='contain' />

            </View>
            <View style={{ flex: 2, marginLeft: 16, height: 120, justifyContent: "space-between" }}>
                <View>
                    <Text style={styles.mainTxt}>
                        {serviceCard.name}
                    </Text>
                    <Text style={styles.txt} numberOfLines={2}>
                        {serviceCard.description}
                    </Text>
                </View>

                <View style={styles.priceDel}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        ₹{serviceCard.serviceCharge}
                    </Text>
                    <TouchableOpacity style={styles.btn} onPress={handleRemoveFromCart}>
                        <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CartCards

const styles = StyleSheet.create({
    cardCont: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        marginVertical: 5
    },
    cardImg: {
        width: 100,
        height: 100
    },

    mainTxt: {
        fontSize: 15,
        fontWeight: "bold"
    },
    txt: {
        fontWeight: "400"
    },
    priceDel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btn: {
        borderWidth: 1,
        borderColor: "#FF7E8B",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#FFF1F2",
        alignItems: "center",
        justifyContent: "center"
    }
})