import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>    
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(features)/linking" options={{ title: "Linking" }} />
    <Stack.Screen name="(features)/share" options={{ title: "Share", presentation: "modal" }} />
    <Stack.Screen name="(features)/dimensions" options={{ title: "Dimensions" }} />
  </Stack>
}
