import { Image, RootTagContext, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Ratings from '../../components/Ratings';
import ReviewCard from '../../components/ReviewCard';
import ButtonsPS from '../../components/ButtonsPS';
import CategoryContext from '../../context/CategoryContext';
import { useNavigation } from '@react-navigation/native';

const ServiceSlugScreen = ({ route }) => {

    const { item } = route.params;

    const { reviews } = useContext(CategoryContext);
    // console.log("This is a particular service review: ", reviews);

    const navigation = useNavigation();

    const handleVisitProvider = () => {
        navigation.navigate("SPProfile");
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={require("../../assets/bruh.png")} alt='service img' style={{ height: 230, width: "100%" }} />

                <View style={styles.infoCont}>
                    <View>
                        <Text style={[styles.margins, { fontSize: 25, fontWeight: "bold" }]}>{item.name}</Text>

                        <View style={[styles.margins, { flexDirection: "row", alignItems: "center" }]}>
                            <Text style={{ marginRight: 5, fontWeight: "bold" }}>
                                {item.rating}
                            </Text>
                            <Ratings rating={item.rating} />
                        </View>

                        <View style={[styles.margins, { flexDirection: "row" }]}>
                            <Text style={{ fontWeight: "500" }}>Sahaji Raje Marg Vile Parle East</Text>
                            <Text style={{ color: "#888888", fontWeight: "500" }}>  . 1.2km</Text>
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
                                {item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aut vitae sint atque cumque veritatis impedit similique quaerat consectetur quisquam.
                            </Text>
                        </View>

                        <TouchableOpacity style={{ marginVertical: 20 }}>
                            <ButtonsPS title={`Add Service   ₹${item.serviceCharge}`} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.description}>
                        <Text style={styles.titles}>
                            Reviews
                        </Text>
                        <ReviewCard item={reviews} />
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
        backgroundColor: "#fff"
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
        marginVertical: 5
    }
})