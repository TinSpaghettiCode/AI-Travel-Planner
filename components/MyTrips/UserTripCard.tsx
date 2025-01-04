import { View, Text, Image } from 'react-native';
import React from 'react';
import { TripDataProps } from '../CreateTrip/tripData';
import { UserTripsProps } from './props';
import moment from 'moment';
import { Colors } from '@/constants/Colors';

interface UserTripCardParams {
  trip: UserTripsProps;
}

export default function UserTripCard({ trip }: UserTripCardParams) {
  const LatestTrip: TripDataProps = JSON.parse(trip.tripData);

  const imageSources = [
    require('./../../assets/images/places_1.png'),
    require('./../../assets/images/places_2.png'),
    require('./../../assets/images/places_3.png'),
    require('./../../assets/images/places_4.png'),
    require('./../../assets/images/places_5.png'),
    require('./../../assets/images/places_6.png'),
    require('./../../assets/images/places_7.png'),
    require('./../../assets/images/places_8.png'),
  ];
  // Function to get a random image source
  const getRandomImageSource = () => {
    const randomIndex = Math.floor(Math.random() * imageSources.length); // Random index between 0 and 7
    return imageSources[randomIndex]; // Return the random image source
  };

  return (
    <View
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <Image
        source={getRandomImageSource()}
        // source={{
        //   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        // }}
        style={{
          width: 100,
          height: 100,
          // objectFit: "cover",
          borderRadius: 15,
        }}
      />

      <View style={{ width: 300, gap: 5 }}>
        <Text
          style={{
            fontFamily: 'roboto-medium',
            fontSize: 16,
          }}
          numberOfLines={1}
        >
          {trip?.tripPlan?.travelPlan?.destination ||
            trip?.tripPlan?.destination}
        </Text>
        <Text
          style={{
            fontFamily: 'roboto-regular',
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(LatestTrip.startDate).format('DD MMM yyyy')}
        </Text>
        <Text
          style={{
            fontFamily: 'roboto-regular',
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Travelling: {LatestTrip.traveller.title}
        </Text>
      </View>
    </View>
  );
}
