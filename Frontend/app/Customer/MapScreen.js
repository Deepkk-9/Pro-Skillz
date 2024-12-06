import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import ProviderCard from '../../components/ProviderCard';

const { width: screenWidth } = Dimensions.get('window');

const MapScreen = ({ route }) => {
  // const { itemId } = route.params;
  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  };

  const mapRef = useRef(null);

  const [locations, setLocations] = useState([
    { id: '1', title: 'Provider 1', coordinates: { latitude: 37.7749, longitude: -122.4194 } },
    { id: '2', title: 'Provider 2', coordinates: { latitude: 37.7894, longitude: -122.4224 } },
    { id: '3', title: 'Provider 3', coordinates: { latitude: 37.7825, longitude: -122.4113 } },
    { id: '4', title: 'Provider 4', coordinates: { latitude: 37.7858, longitude: -122.4126 } },
    { id: '5', title: 'Provider 5', coordinates: { latitude: 37.7775, longitude: -122.4184 } },
    { id: '6', title: 'Provider 6', coordinates: { latitude: 37.7812, longitude: -122.4071 } },
    // Add more locations as needed
  ]);

  const handleCardChange = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);

    if (locations[index]) {
      const { latitude, longitude } = locations[index].coordinates;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} ref={mapRef}>
        {locations.map((location) => (
          <Marker style={styles.activeMarker}
            key={location.id}
            coordinate={location.coordinates}
            title={location.title}
          // pinColor='blue'
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{location.title}</Text>
                {/* <Text>Latitude: {location.coordinates.latitude.toFixed(4)}</Text>
                <Text>Longitude: {location.coordinates.longitude.toFixed(4)}</Text> */}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
        pagingEnabled
        onMomentumScrollEnd={handleCardChange}
      >
        {locations.map((location) => (
          <ProviderCard
            key={location.id}
            title={location.title}
            latitude={location.coordinates.latitude}
            longitude={location.coordinates.longitude}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardList: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    marginLeft: screenWidth * 0.04,
  },

  calloutContainer: {
    width: 200,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

});

export default MapScreen;
