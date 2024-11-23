import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export interface FlightDetailsProps {
  airline: string;
  arrivalAirport: string;
  arrivalDate: string;
  bookingUrl: string;
  departureAirport: string;
  departureDate: string;
  flightNumber: string;
  price: string;
}

interface FlightInfoParams {
  flightData: FlightDetailsProps;
}

export default function FlightInfo({ flightData }: FlightInfoParams) {
  // console.log(flightData);

  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'roboto-bold',
            fontSize: 20,
          }}
        >
          ✈ Flights
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Colors.WHITE,
              fontFamily: 'roboto-regular',
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 17,
          marginTop: 7,
        }}
      >
        Airline: {flightData.airline}
      </Text>
      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 17,
        }}
      >
        Price: {flightData.price} $
      </Text>
    </View>
  );
}
