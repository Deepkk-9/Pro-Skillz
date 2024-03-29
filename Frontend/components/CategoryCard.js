import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CategoryCard = ({ item }) => {

    const navigation = useNavigation()

    const handleClickCategory = () => {
        navigation.navigate("SlugCategory", { item })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleClickCategory(item)}>
            <View style={styles.mCont}>
                <Image source={{ uri: `data:${item.icon.contentType};base64,${item.icon.data}` }} alt='category img' style={{ marginVertical: 10, width: 65, height: 65 }} />
                <Text style={styles.txt}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        width: "48%",
        backgroundColor: "#F2F2F2",
        marginVertical: "2%",
        height: 150,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    mCont: {
        alignItems: "center",
        justifyContent: "center"
    },
    txt: {
        fontSize: 15
    },

})