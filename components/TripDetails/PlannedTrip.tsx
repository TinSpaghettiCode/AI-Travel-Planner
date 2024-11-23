import { View, Text } from 'react-native';
import React from 'react';
import PlaceCard from './PlaceCard';

interface geoCoordinatesProps {
  latitude: string;
  longitude: string;
}

export interface ActivityProps {
  activity: string;
  place: string;
  time: string;
}

interface DailyPlanProps {
  activities: ActivityProps[];
  day: string;
}

interface PlannedTripParams {
  dailyPlan: DailyPlanProps[];
}

export default function PlannedTrip({ dailyPlan }: PlannedTripParams) {
  return (
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
        🏕️ Plan Details
      </Text>

      {dailyPlan.map((plan, index) => (
        <View key={index}>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
              marginTop: 20,
            }}
          >
            {plan.day}
          </Text>
          {plan.activities.map((activity, index) => (
            <PlaceCard key={index} activity={activity} />
          ))}
        </View>
      ))}
    </View>
  );
}
