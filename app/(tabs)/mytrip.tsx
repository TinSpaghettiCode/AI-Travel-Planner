import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
import { useRouter } from 'expo-router';
import { auth, db } from '@/configs/FirebaseConfig';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import UserTripList from '@/components/MyTrips/UserTripList';
import { UserTripsProps } from '@/components/MyTrips/props';

export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState<UserTripsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, 'UserTrips'),
      where('userEmail', '==', user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const tripData = doc.data() as UserTripsProps; // Cast to UserTripsProps
      setUserTrips((prev) => [...prev, { ...tripData, docId: doc.id }]);
    });
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 25,
        paddingTop: 55,
      }}
    >
      {/* Ensure the parent view takes full height */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'roboto-bold',
              fontSize: 35,
            }}
          >
            My Trips
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/create-trip/search-place')}
          >
            <Ionicons name="add-circle" size={50} color="black" />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
        {userTrips.length === 0 ? (
          <StartNewTripCard />
        ) : (
          <UserTripList userTrips={userTrips} />
        )}
      </ScrollView>
    </View>
  );
}
