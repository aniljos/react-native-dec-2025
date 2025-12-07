import React, { useMemo } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useThemePreference, ColorPalette } from "../../hooks/useThemePreference";

const actions = [
  {
    label: "Open Google",
    description: "Launches google.com in your browser.",
    url: "https://www.google.com",
  },
  {
    label: "Call Number",
    description: "Dials +1 (234) 567-890.",
    url: "tel:+1234567890",
  },
  {
    label: "Send SMS",
    description: "Starts an SMS with a prefilled message.",
    url: "sms:+1234567890?body=Hello from Expo Router",
  },
];

const LinkingScreen = () => {
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  async function openUrl(url: string) {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Not supported", "This action is not available.");
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Unable to open link", "Please try again.");
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Linking</Text>
        <Text style={styles.subtitle}>Test deep links and device actions</Text>
      </View>

      <View style={styles.contentCard}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            style={styles.linkAction}
            onPress={() => openUrl(action.url)}
          >
            <Text style={styles.actionLabel}>{action.label}</Text>
            <Text style={styles.actionDescription}>{action.description}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default LinkingScreen;

const createStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingTop: 72,
    },
    header: {
      alignItems: "flex-start",
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      marginTop: 8,
      fontSize: 16,
      color: colors.muted,
    },
    contentCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.45,
      shadowRadius: 14,
      elevation: 6,
      gap: 12,
    },
    linkAction: {
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor:
        colors.card === "#ffffff" ? "#f8fafc" : "rgba(255,255,255,0.04)",
    },
    actionLabel: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 6,
    },
    actionDescription: {
      color: colors.muted,
      fontSize: 15,
      lineHeight: 20,
    },
  });
