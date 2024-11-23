import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
// import { GetPhotoRef } from "@/services/GooglePlaceAPI"
import HotelCard from './HotelCard';

interface geoCoordinatesProps {
  latitude: string;
  longitude: string;
}

export interface HotelDetailsProps {
  address: string;
  description: string;
  geoCoordinates: geoCoordinatesProps;
  hotelName: string;
  imageUrl: string;
  price: string;
  rating: string;
}

interface HotelListParams {
  hotelList: HotelDetailsProps[];
}

export default function HotelList({ hotelList }: HotelListParams) {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 20,
        }}
      >
        🏠 Hotel Recommendation
      </Text>

      <FlatList
        data={hotelList}
        keyExtractor={(item) => item?.address.toString()} // Ensure each item has a unique key
        style={{
          marginTop: 8,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => <HotelCard item={item} />}
      />
    </View>
  );
}
