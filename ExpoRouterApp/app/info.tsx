import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useThemePreference, ColorPalette } from "../hooks/useThemePreference";

const featureGroups = [
  {
    title: "Navigation & Structure",
    items: [
      "Expo Router for declarative routing",
      "Protected product routes with auth guard",
      "Modal presentation for Share screen",
    ],
  },
  {
    title: "State & Theming",
    items: [
      "Redux store for auth and theme state",
      "Dynamic light/dark theme toggle with persistence",
      "AsyncStorage used to save theme preference",
      "Custom hooks: useAuthGuard, useThemePreference",
    ],
  },
  {
    title: "Auth & API",
    items: [
      "Login with axios POST to backend",
      "Secure API calls include Bearer access token",
      "Auth slice tracks userName, access/refresh tokens",
      "Logout clears auth state globally",
    ],
  },
  {
    title: "Expo / React Native APIs",
    items: [
      "Linking for external URLs, calls, SMS",
      "Share API for messaging",
      "Dimensions demo with orientation toggle and layouts",
      "Expo Image component for product media",
    ],
  },
  {
    title: "Features & UI",
    items: [
      "Products list and detail views",
      "Login screen with validation feedback",
      "Reusable card layouts and typography",
    ],
  },
];

const InfoScreen = () => {
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>App Features</Text>
      <Text style={styles.subtitle}>Overview of what’s built into this project</Text>

      {featureGroups.map((group) => (
        <View key={group.title} style={styles.card}>
          <Text style={styles.cardTitle}>{group.title}</Text>
          {group.items.map((item) => (
            <Text key={item} style={styles.item}>
              • {item}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default InfoScreen;

const createStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 24,
      paddingTop: 72,
      paddingBottom: 32,
      gap: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.muted,
      marginBottom: 4,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 5,
      gap: 8,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 4,
    },
    item: {
      color: colors.muted,
      fontSize: 15,
      lineHeight: 20,
    },
  });
