import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

import 'react-native-get-random-values';
import { ScrollView } from 'react-native-virtualized-view';
import { CreateTripContext } from '@/context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons';

export default function SearchPlace() {
  const [locationName, setLocationName] = useState('');
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

  const handleSetLocation = () => {
    if (locationName.trim()) {
      setTripData({
        locationInfo: {
          name: locationName,
          coordinates: {
            lat: 21.0285, // Bạn có thể thay đổi giá trị này nếu cần
            lng: 105.8542, // Bạn có thể thay đổi giá trị này nếu cần
          },
          photoRef:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/396px-Thap_Rua.jpg', // Cập nhật ảnh nếu cần
        },
      });
      router.push('/create-trip/select-traveler');
    }
  };

  return (
    <View
      style={{
        marginTop: 75,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
      }}
    >
      <TextInput
        placeholder="Enter location"
        value={locationName}
        onChangeText={setLocationName}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          fontSize: 16,
        }}
      />
      <TouchableOpacity
        onPress={handleSetLocation}
        style={{
          backgroundColor: Colors.PRIMARY, // Màu nền cho nút
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>

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
    </View>
  );
}
