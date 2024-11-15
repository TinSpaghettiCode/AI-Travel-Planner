import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Ionicons name="location-sharp" size={30} color={Colors.PRIMARY} />
      <Text style={{ fontSize: 25, fontFamily: 'roboto-medium' }}>
        No trips planned yet
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontFamily: 'roboto-regular',
          textAlign: 'center',
          color: Colors.GRAY,
        }}
      >
        Looks like it's time to start a new trip! Get started below
      </Text>

      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
        onPress={() => router.push('/create-trip/search-place')}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'roboto-medium',
            fontSize: 17,
          }}
        >
          Start a new trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
