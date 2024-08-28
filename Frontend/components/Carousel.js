import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const Carousel = () => {
    const carouselData = [
        {
            id: '1',
            image: require('../assets/bruh.png'),
            title: 'Carousel Item 1',
        },
        {
            id: '2',
            image: require('../assets/bruh1.jpg'),
            title: 'Carousel Item 2',
        },
        {
            id: '3',
            image: require('../assets/bruh2.jpg'),
            title: 'Carousel Item 3',
        },
    ];

    return (
        <View style={styles.wrapper}>
            <Swiper autoplay={true} loop={true} showsPagination={false}>
                {carouselData.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        marginBottom: 20
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: "100%"
    },
    image: {
        width: '100%',
        height: "100%",
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Carousel;
