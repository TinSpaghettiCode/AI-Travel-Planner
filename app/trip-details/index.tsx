import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { TripDataProps } from '@/components/CreateTrip/tripData';
import { UserTripsProps } from '@/components/MyTrips/props';
import { Colors } from '@/constants/Colors';
import moment from 'moment';

import FlightInfo from '@/components/TripDetails/FlightInfo';
import HotelList from '@/components/TripDetails/HotelList';
import PlannedTrip from '@/components/TripDetails/PlannedTrip';

type SearchParamsProps = {
  trip: string; // UserTripsProps in string
};

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams<SearchParamsProps>();

  const [userTrip, setUserTrip] = useState<UserTripsProps>();
  const [tripDetails, setTripDetails] = useState<TripDataProps>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    const _userTrip: UserTripsProps = JSON.parse(trip);
    setUserTrip(_userTrip);

    const _tripDetails: TripDataProps = JSON.parse(_userTrip.tripData);
    setTripDetails(_tripDetails);
  }, []);

  useEffect(() => {
    console.log(userTrip, tripDetails, 'tripsss');
  }, [userTrip, tripDetails]);

  return (
    tripDetails && (
      <ScrollView>
        <Image
          source={require('./../../assets/images/image_1.jpeg')}
          style={{
            width: '100%',
            height: 330,
          }}
        />

        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: '100%',
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'roboto-bold',
            }}
          >
            {userTrip?.tripPlan?.destination || tripDetails?.locationInfo?.name}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              {moment(tripDetails.startDate).format('DD MMM yyyy')}
            </Text>

            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              - {moment(tripDetails.endDate).format('DD MMM yyyy')}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            🚌 {tripDetails.traveller.title}
          </Text>

          {/* Flight Info */}
          <FlightInfo
            flightData={
              userTrip?.tripPlan?.flightDetails?.length > 0
                ? userTrip?.tripPlan?.flightDetails[0]
                : null
            }
          />

          {/* Hotels List */}
          <HotelList hotelList={userTrip?.tripPlan?.hotels} />

          {/* Trip Day Planner Info */}
          <PlannedTrip
            dailyPlan={userTrip?.tripPlan?.dailyPlan || []} // Đảm bảo là mảng
          />
        </View>
      </ScrollView>
    )
  );
}
