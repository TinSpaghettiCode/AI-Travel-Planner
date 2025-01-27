import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { CreateTripContext } from '@/context/CreateTripContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/* Stop at 1:46:00, Record: 30:00 */

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [tripData, setTripData] = useState<any>([]);

  const [loaded, error] = useFonts({
    'roboto-regular': require('./../assets/fonts/Roboto-Regular.ttf'),
    'roboto-medium': require('./../assets/fonts/Roboto-Medium.ttf'),
    'roboto-bold': require('./../assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('./../assets/fonts/Roboto-Italic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="auth/sign-in/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="auth/sign-up/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </CreateTripContext.Provider>
    </SafeAreaProvider>
  );
}
