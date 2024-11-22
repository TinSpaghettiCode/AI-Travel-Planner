import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { CreateTripContext } from '@/context/CreateTripContext';
import { set } from 'date-fns';

const SelectDate = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const { tripData, setTripData } = useContext<any>(CreateTripContext);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const onDateChange = (date: Date, type?: 'START_DATE' | 'END_DATE') => {
    console.log('Selected Date:', date, type); // Log giá trị date
    if (type === 'START_DATE') {
      setStartDate(moment(date).toDate());
    } else if (type === 'END_DATE') {
      setEndDate(moment(date).toDate());
    }
  };

  const onDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show('Please select start and end date', ToastAndroid.SHORT);
      return;
    }

    const totalNoOfDays = moment(endDate).diff(moment(startDate), 'days');
    console.log(totalNoOfDays + 1, 'Total Days');

    setTripData({
      ...tripData,
      startDate,
      endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });

    router.push('/create-trip/select-budget');
  };

  // Theo dõi sự thay đổi của startDate
  useEffect(() => {
    if (startDate && (!endDate || isNaN(endDate.getTime()))) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

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
      <Text style={{ fontFamily: 'roboto-bold', fontSize: 35, marginTop: 20 }}>
        Travel Dates
      </Text>

      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextColor="white"
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 35,
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
        onPress={onDateSelectionContinue}
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

export default SelectDate;
