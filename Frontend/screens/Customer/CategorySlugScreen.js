import { StyleSheet, Text, TouchableHighlight, View, ScrollView, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ServiceProviderCard from '../../components/ServiceProviderCard';
import ServiceProviderData from '../../constants/ServiceProviderData';
import CategoryContext from '../../context/CategoryContext';
import { gql, useQuery } from '@apollo/client';
import LocationContext from '../../context/LocationContext';
import Cart from '../../components/Cart';
import CartContext from '../../context/CartContext';


const CategorySlugScreen = ({ route }) => {

    const { item } = route.params;

    const { longLat } = useContext(LocationContext);


    const { cart, getAllServicesFromCart } = useContext(CartContext);

    useEffect(() => {
        getAllServicesFromCart();
    }, [])


    const GET_SERVICES = gql`
    query GetServiceCards($serviceCategoryName: String!, $coordinates: [Float]!) {
      getServiceCards(serviceCategoryName: $serviceCategoryName) {
        id
        provider
        name
        description
        serviceCharge
        rating
        image {
          data
          contentType
        }
        providerName
        location {
          type
          coordinates
        }
        distance(coordinates: $coordinates)
      }
    }`;

    // console.log(longLat);

    let serviceCategoryName = item.name;
    let coordinates = longLat;

    const { loading, error, data } = useQuery(GET_SERVICES, {
        variables: { serviceCategoryName, coordinates }
    })

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    // console.log("Graph QL : ", item);
    // console.log(item);

    return (
        <View style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false}
                style={
                    cart ?
                        cart.totalPrice > 0 ? { marginBottom: 100 } : { marginBottom: 0 }
                        : { marginBottom: 0 }}>
                <Image style={styles.imgBanner} source={{ uri: `data:${item.image.contentType};base64,${item.image.data}` }} alt='category banner' />



                <Text style={styles.txt}>
                    Recommended {item.name}'s For You
                </Text>

                <View style={styles.cont}>
                    {
                        data ?
                            data.getServiceCards.map((serviceItem) => (
                                cart.services && cart.services.length > 0 ?
                                    cart.services.includes(serviceItem.id)
                                        ?
                                        <ServiceProviderCard item={serviceItem} key={serviceItem.id} inCart={true} /> :
                                        <ServiceProviderCard item={serviceItem} key={serviceItem.id} inCart={false} /> :
                                    <ServiceProviderCard item={serviceItem} key={serviceItem.id} inCart={false} />

                            ))
                            : <Text>No services available</Text>
                    }
                </View>
            </ScrollView>


            {console.log(cart.totalPrice)}
            {

                cart.totalPrice ? cart.totalPrice > 0 ?
                    <View style={styles.cartBtm}>
                        <Cart totalPrice={cart.totalPrice} />
                    </View>
                    :
                    <></> :
                    <></>
            }
        </View>
    )
}

export default CategorySlugScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative"
    },
    imgBanner: {
        width: "100%",
        height: 230,
        marginBottom: 20,
        resizeMode: "cover"
    },
    txt: {
        fontSize: 20,
        marginBottom: 15,
        paddingHorizontal: 16
    },

    cont: {
        width: "100%",
        paddingHorizontal: 16
    },
    cartBtm: {
        position: "absolute",
        bottom: 0,
        zIndex: 10,
        width: "100%",
    }
})