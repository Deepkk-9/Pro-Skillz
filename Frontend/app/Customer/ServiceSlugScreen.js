import { Image, RootTagContext, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Ratings from '../../components/Ratings';
import ReviewCard from '../../components/ReviewCard';
import ButtonsPS from '../../components/ButtonsPS';
import CategoryContext from '../../context/CategoryContext';
import { useNavigation } from '@react-navigation/native';
import CartContext from '../../context/CartContext';

const ServiceSlugScreen = ({ route }) => {

    const { item, address, distance } = route.params;

    const { reviews } = useContext(CategoryContext);
    const { addInCart, removeFromCart } = useContext(CartContext);
    // console.log("This is a particular service review: ", reviews);
    // console.log("ITem: ", item);

    const navigation = useNavigation();

    const handleVisitProvider = () => {
        navigation.navigate("SPProfile");
    }

    const handleRemoveService = () => {
        removeFromCart(item.id);
        navigation.goBack();
    }

    const handleAddService = () => {
        addInCart(item.id);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{ height: 230, width: "100%" }} source={{ uri: `data:${item.image.contentType};base64,${item.image.data}` }} alt='service img' />

                <View style={styles.infoCont}>
                    <View>
                        <Text style={[styles.margins, { fontSize: 25, fontWeight: "bold" }]}>{item.name}</Text>

                        <View style={[styles.margins, { flexDirection: "row", alignItems: "center" }]}>
                            <Text style={{ marginRight: 5, fontWeight: "bold" }}>
                                {item.rating}
                            </Text>
                            <Ratings rating={item.rating} />
                        </View>

                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            ₹{item.serviceCharge}/-
                        </Text>

                        <View style={[styles.margins]}>
                            <Text style={{ fontWeight: "500" }}>
                                {address}
                                <Text style={{ color: "#888888", fontWeight: "500" }}>  . {distance} km
                                </Text>
                            </Text>

                        </View>

                        <TouchableOpacity onPress={handleVisitProvider}>
                            <Text style={[styles.margins, { textDecorationLine: "underline" }]}>
                                Visit Provider
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.description}>
                            <Text style={styles.titles}>
                                About
                            </Text>
                            <Text style={{ fontSize: 15, }}>
                                {item.description}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.description}>
                        <Text style={[styles.titles, { marginTop: 20 }]}>
                            Reviews
                        </Text>

                        <View>
                            {
                                reviews.map((review) => {
                                    return <ReviewCard item={review} key={review._id} />
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ServiceSlugScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    infoCont: {
        padding: 16
    },
    description: {
        marginTop: 5,
    },
    margins: {
        marginVertical: 5
    },
    titles: {
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 5,
    }
})