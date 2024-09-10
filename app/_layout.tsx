import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "roboto-regular": require("./../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("./../assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("./../assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./../assets/fonts/Roboto-Italic.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
