import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function Login() {
  const router = useRouter();
  const { height } = Dimensions.get('window');

  return (
    <View>
      <Image
        source={require('./../assets/images/login.png')}
        style={{
          width: '100%',
          height: height * 0.4,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'roboto-bold',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          AI Travel Planner
        </Text>

        <Text
          style={{
            fontFamily: 'roboto-regular',
            fontSize: 17,
            textAlign: 'center',
            color: Colors.GRAY,
            marginTop: 20,
          }}
        >
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/sign-in')}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: 'center',
              fontFamily: 'roboto-regular',
              fontSize: 17,
            }}
          >
            Sign In With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    height: '100%',
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '20%',
  },
});
