import React from 'react';
import { View, FlatList } from 'react-native';
import serviceData from '../../constants/constants';
import ServiceCard from '../../components/ServiceCard';

const ServiceGridScreen = () => {

  const renderCard = ({ item }) => (
    <ServiceCard title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
    />
  );

  return (
    <View>
      <FlatList style={{ margin: 11, marginTop: 50 }}
        data={serviceData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2} // Number of columns in the grid
        showsVerticalScrollIndicator={false}

      />
    </View>
  );
};

export default ServiceGridScreen;