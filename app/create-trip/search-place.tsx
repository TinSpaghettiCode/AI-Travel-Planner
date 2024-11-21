import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

import 'react-native-get-random-values';
import { ScrollView } from 'react-native-virtualized-view';
import { CreateTripContext } from '@/context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext<any>(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <Text
        onPress={() => {
          setTripData({
            locationInfo: {
              name: 'Hồ Gươm',
              coordinates: {
                lat: 21.0285, // Correct latitude for Hồ Gươm
                lng: 105.8542, // Correct longitude for Hồ Gươm
              },
              photoRef:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/396px-Thap_Rua.jpg', // Updated photo reference
            },
          });
          router.push('/create-trip/select-traveler');
        }}
      >
        Search Place
      </Text>

      {/* TODO: Find a replacement for Google Map API */}
      {/* <GooglePlacesAutocomplete 
      placeholder: "Search"
      fecthDetails={true}
      onPress={(data, details = null) => {
        setTripData({
          locationInfo: {
            name: data.description,
            coordinates: details?.geometry.location,
            photoRef: details?.photos[0].photo_reference,
            url: details?.url
          }
        })/> */}
    </ScrollView>
  );
}
