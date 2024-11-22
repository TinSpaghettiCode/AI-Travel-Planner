import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { Colors } from '@/constants/Colors';
import { CreateTripContext } from '@/context/CreateTripContext';

const SelectBudget = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext<any>(CreateTripContext);
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState<{
    id: number;
    title: string;
    desc: string;
    icon: string;
  } | null>(null);

  const onClickContunue = () => {
    if (!selectedOptions) {
      ToastAndroid.show('Please select a budget option', ToastAndroid.SHORT);
      return;
    }

    router.push('/create-trip/review-trip');
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, budget: selectedOptions });
  }, [selectedOptions]);

  return (
    <View
      style={{
        paddingTop: 75,
        padding: 25,
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
        Budget
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'roboto-bold',
            fontSize: 20,
          }}
        >
          Choose spending habits for your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
              }}
              onPress={() => setSelectedOptions(item)}
            >
              <OptionCard option={item} selectedOptions={selectedOptions} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
        onPress={onClickContunue}
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
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBudget;
