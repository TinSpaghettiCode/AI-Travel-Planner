import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { GetPhotoRef } from '@/services/GooglePlaceAPI';
import { HotelDetailsProps } from './HotelList';

interface HotelCardParams {
  item: HotelDetailsProps;
}

export default function HotelCard({ item }: HotelCardParams) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    GetGooglePhotoRef();
  });
  const GetGooglePhotoRef = async () => {
    // const result = await GetPhotoRef(item.hotelName);
    // setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
  };

  const imageSources = [
    require('./../../assets/images/hotels_1.png'),
    require('./../../assets/images/hotels_2.png'),
    require('./../../assets/images/hotels_3.png'),
    require('./../../assets/images/hotels_4.png'),
    require('./../../assets/images/hotels_5.png'),
    require('./../../assets/images/hotels_6.png'),
    require('./../../assets/images/hotels_7.png'),
    require('./../../assets/images/hotels_8.png'),
  ];
  // Function to get a random image source
  const getRandomImageSource = () => {
    const randomIndex = Math.floor(Math.random() * imageSources.length); // Random index between 0 and 7
    return imageSources[randomIndex]; // Return the random image source
  };

  return (
    <View
      style={{
        marginRight: 20,
        width: 180,
      }}
    >
      <Image
        // source={{
        //   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        // }}
        source={getRandomImageSource()}
        style={{
          width: 180,
          height: 120,
          borderRadius: 15,
        }}
      />

      <View
        style={{
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: 'roboto-medium',
            fontSize: 17,
          }}
        >
          {item.hotelName}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'roboto-regular',
            }}
          >
            ⭐ {item.rating}
          </Text>
          <Text
            style={{
              fontFamily: 'roboto-regular',
            }}
          >
            💰 {item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}
