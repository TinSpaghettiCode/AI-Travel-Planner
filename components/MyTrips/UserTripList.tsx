import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TripDataProps } from '../CreateTrip/tripData';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import UserTripCard from './UserTripCard';
import { UserTripsProps } from './props';
import { useRouter } from 'expo-router';

interface UserTripListParams {
  userTrips: UserTripsProps[];
}

export default function UserTripList({ userTrips }: UserTripListParams) {
  const LatestTrip: TripDataProps = JSON.parse(userTrips[0].tripData);
  const router = useRouter();
  const [selectedTrip, setSelectedTrip] = useState<UserTripsProps | null>(null);

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
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Image
          source={getRandomImageSource()}
          // source={{
          //   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          // }}
          style={{
            width: '100%',
            height: 240,
            objectFit: 'cover',
            borderRadius: 15,
          }}
        />
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {userTrips[1]?.tripPlan?.travelPlan?.destination ||
              userTrips[1]?.tripPlan?.travelPlan?.location}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              {moment(LatestTrip.startDate).format('DD MMM yyyy')}
            </Text>

            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              🚌 {LatestTrip.traveller.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('userTrip: ' + JSON.stringify(userTrips[1]));

              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(userTrips[1]),
                },
              });
            }}
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'roboto-medium',
                fontSize: 15,
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>
        </View>

        {/* {userTrips.map((trip) => (
          <View key={trip.docId}>
            <UserTripCard trip={trip} />
          </View>
        ))} */}
        {userTrips.map((trip) => (
          <View
            key={trip.docId}
            style={{
              borderRadius: 15,
              // borderWidth: selectedTripId === trip.docId ? 2 : 0, // Black border if selected
              borderColor: 'black',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedTrip(trip);

                router.push({
                  pathname: '/trip-details',
                  params: {
                    trip: JSON.stringify(trip),
                  },
                });
              }} // Set selected trip ID
            >
              <UserTripCard trip={trip} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
