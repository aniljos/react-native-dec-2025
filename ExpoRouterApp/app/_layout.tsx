import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { useThemePreference } from "../hooks/useThemePreference";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemedStack />
    </Provider>
  );
}

const ThemedStack = () => {
  const { colors } = useThemePreference();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(features)/linking" />
      <Stack.Screen name="(features)/share" options={{ presentation: "modal" }} />
      <Stack.Screen name="(features)/dimensions" />
      <Stack.Screen name="info" />
    </Stack>
  );
};
