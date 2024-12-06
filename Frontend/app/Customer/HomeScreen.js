import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Image, Alert, ScrollView } from 'react-native';
import serviceData from '../../constants/constants';
import ServiceCard from '../../components/ServiceCard';
import UserProfileHeader from '../../components/AppBar';
import { Dimensions } from 'react-native';
import SearchContainer from '../../components/SearchContainer';
import UserHomePageLocation from '../../components/UserHomePageLocation';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../../components/Carousel';
import * as Location from 'expo-location';
import LocationContext from '../../context/LocationContext';
import CardsLayout from './CardsLayout';
import CategoryData from '../../constants/CategoryData';
import CategoryContext from '../../context/CategoryContext';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {

  const { setLocation, setLongLat } = useContext(LocationContext);
  const { category, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let locationC = await Location.getCurrentPositionAsync({});

      setLongLat([locationC.coords.latitude, locationC.coords.longitude])

      // console.log(locationC);

      let userL = await Location.reverseGeocodeAsync({ latitude: locationC.coords.latitude, longitude: locationC.coords.longitude });
      setLocation(userL);

    })();

    getAllCategories();
  }, []);

  const navigation = useNavigation();

  const handleCatSulg = (item) => {
    navigation.navigate("SlugCategory", { item })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <UserHomePageLocation />

      <SearchContainer searchText={"Search for Services"} />

      <View style={{ marginBottom: 20 }}>
        <View style={styles.categoryList}>
          <Text style={styles.txt}>Categories</Text>
          <Text onPress={() => navigation.navigate("Category")}>View all</Text>
        </View>

        <FlatList
          data={category}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity key={item._id} onPress={() => handleCatSulg(item)}>
                <View style={styles.categoryItem}>
                  <Image source={{ uri: `data:${item.icon.contentType};base64,${item.icon.data}` }} style={{ width: "100%", height: "100%", borderRadius: 8 }} alt='cat' />
                </View>
              </TouchableOpacity>
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>

      <Carousel />

      <CardsLayout serviceData={serviceData.slice(0, 4)} cardLayoutTitle={"Deals Of The Day"} title={"Deals"} />

      <View>
        <Text style={[styles.txt, { marginBottom: 15 }]}>
          New Services
        </Text>

        <Carousel />
      </View>

      <View style={{ marginBottom: 85 }}>
        <CardsLayout serviceData={serviceData.slice(0, 4)} cardLayoutTitle={"Recently Viewed Services"} title={"Recents"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  txt: {
    fontSize: 20
  },
  header: {
    marginTop: 35,
    fontSize: 20,
  },
  greetings: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  featuredItem: {
    width: "100%",
    height: 150,
    backgroundColor: '#3B37FF',
    borderRadius: 8,
    padding: 16,
  },
  separator: {
    marginLeft: windowWidth * 0.02,
  },
  featuredItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  categoryItem: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  categoryList: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 8
  },
  newServImg: {
    width: "100%",
    height: 200,
    marginTop: 15,

  }
});

export default HomeScreen;
