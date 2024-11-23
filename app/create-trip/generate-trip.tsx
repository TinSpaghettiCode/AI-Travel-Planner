import { View, Text, Image, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { generateTripPrompt } from '@/components/CreateTrip/generate-prompt';
import { chatSession } from './../../configs/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';

export default function GenerateTrip() {
  // const navigation = useNavigation();
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
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp = JSON.parse(result.response.text());

    setLoading(false);

    // add AI Trip to database
    const docId = Date.now().toString();
    try {
      const result_ = await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user?.email,
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        docId: docId,
      });

      console.log(result_);

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
