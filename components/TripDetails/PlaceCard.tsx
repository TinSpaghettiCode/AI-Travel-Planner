import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { ActivityProps } from './PlannedTrip';
// import { GetPhotoRef } from '@/services/GooglePlaceAPI';

interface PlaceCardParams {
  activity: ActivityProps;
}

export default function PlaceCard({ activity }: PlaceCardParams) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    GetGooglePhotoRef();
  });
  const GetGooglePhotoRef = async () => {
    // const result = await GetPhotoRef(activity.place);
    // setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
    // console.log(result?.results[0]?.photos[0]?.photo_reference);
  };

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
        // borderWidth: 1,
        backgroundColor: '#e3f8ff',
        padding: 10,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        marginTop: 20,
      }}
    >
      <Image
        source={getRandomImageSource()}
        // source={{
        //   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        // }}
        style={{
          width: '100%',
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginTop: 5,
        }}
      ></View>
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 20,
        }}
      >
        {activity.place}
      </Text>
      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 17,
        }}
      >
        {activity.activity}
      </Text>

      {/* <Text>Ticket Price: {}</Text> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Activity Time(and Ticket) */}
        <View>
          <Text
            style={{
              fontFamily: 'roboto-regular',
              fontSize: 17,
            }}
          >
            ⏱️ Time:
            <Text
              style={{
                fontFamily: 'roboto-bold',
                fontSize: 17,
              }}
            >
              {' '}
              {activity.time}
            </Text>
          </Text>
        </View>

        {/* Navigate */}
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 8,
            borderRadius: 7,
          }}
        >
          <Ionicons name="navigate" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
