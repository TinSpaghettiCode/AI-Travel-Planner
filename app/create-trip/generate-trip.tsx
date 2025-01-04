import { View, Text, Image, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { generateTripPrompt } from '@/components/CreateTrip/generate-prompt';
import { chatSession } from './../../configs/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import OpenAI from 'openai';

export default function GenerateTrip() {
  // const navigation = useNavigation();
  const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY });

  const router = useRouter();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const { tripData, setTripData } = useContext<any>(CreateTripContext);

  useEffect(() => {
    GenerateAITrip();
  }, []);

  // prevent user back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const GenerateAITrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = generateTripPrompt({
      locationInfo: tripData.locationInfo,
      totalNoOfDays: tripData.totalNoOfDays,
      traveller: tripData.traveller,
      budget: tripData.budget.title, // Assuming budget is an object and you want the title
      startDate: tripData.startDate, // Include startDate
      endDate: tripData.endDate, // Include endDate
    });
    console.log(FINAL_PROMPT);

    // uncomment on production
    // Sử dụng OpenAI để tạo trip
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06', // Sử dụng mô hình OpenAI
      messages: [
        {
          role: 'developer',
          content: 'Generate a trip plan based on the following details.',
        },
        { role: 'user', content: FINAL_PROMPT },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'trip_plan_schema',
          schema: {
            type: 'object',
            properties: {
              docId: { type: 'string' },
              tripData: {
                type: 'object',
                properties: {
                  locationInfo: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      coordinates: {
                        type: 'object',
                        properties: {
                          lat: { type: 'number' },
                          lng: { type: 'number' },
                        },
                        required: ['lat', 'lng'],
                      },
                      photoRef: { type: 'string', format: 'uri' },
                    },
                    required: ['name', 'coordinates', 'photoRef'],
                  },
                  traveller: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      desc: { type: 'string' },
                      icon: { type: 'string' },
                      people: { type: 'string' },
                    },
                    required: ['id', 'title', 'desc', 'icon', 'people'],
                  },
                  startDate: { type: 'string', format: 'date-time' },
                  endDate: { type: 'string', format: 'date-time' },
                  totalNoOfDays: { type: 'integer' },
                  budget: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      desc: { type: 'string' },
                      icon: { type: 'string' },
                    },
                    required: ['id', 'title', 'desc', 'icon'],
                  },
                },
                required: [
                  'locationInfo',
                  'traveller',
                  'startDate',
                  'endDate',
                  'totalNoOfDays',
                  'budget',
                ],
              },
              tripPlan: { type: 'object' },
              travelPlan: { type: 'object' },
              budget: { type: 'string' },
              dailyPlan: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    day: { type: 'string' },
                    activities: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          activity: { type: 'string' },
                          time: { type: 'string' },
                        },
                        required: ['activity', 'time'],
                      },
                    },
                  },
                  required: ['day', 'activities'],
                },
              },
              destination: { type: 'string' },
              duration: { type: 'string' },
              family: { type: 'boolean' },
              flightDetails: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    airline: { type: 'string' },
                    arrivalAirport: { type: 'string' },
                    arrivalTime: { type: 'string' },
                    bookingUrl: { type: 'string', format: 'uri' },
                    departureAirport: { type: 'string' },
                    departureTime: { type: 'string' },
                    flightNumber: { type: 'string' },
                    price: { type: 'string' },
                  },
                  required: [
                    'airline',
                    'arrivalAirport',
                    'arrivalTime',
                    'bookingUrl',
                    'departureAirport',
                    'departureTime',
                    'flightNumber',
                    'price',
                  ],
                },
              },
              hotels: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    address: { type: 'string' },
                    description: { type: 'string' },
                    geoCoordinates: {
                      type: 'object',
                      properties: {
                        latitude: { type: 'string' },
                        longitude: { type: 'string' },
                      },
                      required: ['latitude', 'longitude'],
                    },
                    hotelName: { type: 'string' },
                    imageUrl: { type: 'string', format: 'uri' },
                    price: { type: 'string' },
                    rating: { type: 'string' },
                  },
                  required: [
                    'address',
                    'description',
                    'geoCoordinates',
                    'hotelName',
                    'imageUrl',
                    'price',
                    'rating',
                  ],
                },
              },
              placesToVisit: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    geoCoordinates: {
                      type: 'object',
                      properties: {
                        latitude: { type: 'string' },
                        longitude: { type: 'string' },
                      },
                      required: ['latitude', 'longitude'],
                    },
                    placeDetails: { type: 'string' },
                    placeImageUrl: { type: 'string', format: 'uri' },
                    placeName: { type: 'string' },
                    ticketPricing: { type: 'string' },
                    timeToTravel: { type: 'string' },
                  },
                  required: [
                    'geoCoordinates',
                    'placeDetails',
                    'placeImageUrl',
                    'placeName',
                    'ticketPricing',
                    'timeToTravel',
                  ],
                },
              },
              userEmail: { type: 'string', format: 'email' },
            },
            required: [
              'docId',
              'tripData',
              'tripPlan',
              'dailyPlan',
              'destination',
              'duration',
              'family',
              'flightDetails',
              'hotels',
              'placesToVisit',
              'userEmail',
            ],
            additionNalProperties: false,
          },
        },
      },
    });

    console.log(completion.choices[0].message.content);

    // add AI Trip to database
    const docId = Date.now().toString();
    try {
      const result_ = await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user?.email,
        tripPlan: JSON.parse(completion.choices[0].message.content as string),
        tripData: JSON.stringify(tripData),
        docId: docId,
      });

      console.log(result_);

      setLoading(false);
      router.push('/(tabs)/mytrip');
    } catch (error) {
      console.error(error);
    }
  };

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
          textAlign: 'center',
        }}
      >
        Please wait...
      </Text>
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip
      </Text>

      <Image
        source={require('./../../assets/images/plane.gif')}
        style={{
          width: '100%',
          height: 200,
          objectFit: 'contain',
        }}
      />

      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 20,
          color: Colors.GRAY,
          textAlign: 'center',
        }}
      >
        Do not go back
      </Text>
    </View>
  );
}
