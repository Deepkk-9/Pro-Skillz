import { Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const DealsItem = ({ item }) => {

    const navigation = useNavigation();

    const handleCardClick = (item) => {
        // navigation.navigate("SlugService", { item });
    }

    return (
        <TouchableHighlight style={styles.container} key={item.id} onPress={() => handleCardClick(item)}>
            <View>
                <Image source={item.imageUrl} alt='cat' style={styles.img} />
                <View style={styles.lowerCard}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{ color: "white" }}>VIEW DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default DealsItem

const styles = StyleSheet.create({
    container: {
        width: "48%",
        marginVertical: "2%",
        height: 250,
        borderWidth: 0.7,
        borderColor: "#D9D9D9",
        borderRadius: 10
    },
    img: {
        height: "50%",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    btn: {
        backgroundColor: "#3B37FF",
        borderRadius: 8,
        width: "100%",
        padding: 6,
        alignItems: "center",
    },
    lowerCard: {
        padding: 10,
        height: "50%",
        justifyContent: "space-between"
    }
})