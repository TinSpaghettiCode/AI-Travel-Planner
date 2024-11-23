import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '@/context/CreateTripContext';
import moment from 'moment';

const ReviewTrip = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext<any>(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Review Your Trip
      </Text>

      <View
        style={{
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'roboto-medium',
          }}
        >
          Before generating your trip, please review your selections.
        </Text>
      </View>

      {/* Destination info */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        {/* <Ionicons name="location" size={34} color="black" /> */}
        <Text style={{ fontSize: 25 }}>📍</Text>
        <View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Destination
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {tripData?.locationInfo?.name}
          </Text>
        </View>
      </View>

      {/* Date Selection info */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        {/* <Ionicons name="location" size={34} color="black" /> */}
        <Text style={{ fontSize: 25 }}>🗓️</Text>
        <View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Travel Date
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {moment(tripData?.startDate).format('MMM Do, YYYY') +
              ' - ' +
              moment(tripData?.endDate).format('MMM Do, YYYY')}
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Total of: {tripData?.totalNoOfDays} days
          </Text>
        </View>
      </View>

      {/* Traveller info */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 25 }}>🚌</Text>
        <View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Who is Travelling
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {tripData?.traveller?.title}
          </Text>
        </View>
      </View>

      {/* Budget info */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 25 }}>💰</Text>
        <View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Budget
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {tripData?.budget?.title}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 40,
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
        onPress={() => {
          router.push('/create-trip/generate-trip');
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            fontFamily: 'roboto-medium',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Build My Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewTrip;
