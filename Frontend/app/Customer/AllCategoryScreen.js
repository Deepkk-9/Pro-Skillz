import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import CategoryData from '../../constants/CategoryData';
import CategoryCard from '../../components/CategoryCard';
import SearchBar from '../../components/SearchBar';
import CategoryContext from '../../context/CategoryContext';

const AllCategoryScreen = () => {

    const { category, getAllCategories } = useContext(CategoryContext);

    return (
        <View style={styles.container} >

            <SearchBar />

            <Text style={styles.txt}>
                Categories
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cont}>
                    {
                        category.map((item) => {
                            return <CategoryCard item={item} key={item._id} />
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default AllCategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    txt: {
        fontSize: 20,
        marginBottom: 15
    },

    cont: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 85
    }
})