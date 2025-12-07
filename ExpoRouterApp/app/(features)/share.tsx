import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useThemePreference, ColorPalette } from "../../hooks/useThemePreference";

const ShareScreen = () => {
  const [message, setMessage] = useState("");
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  async function shareMessage() {
    if (!message.trim()) {
      Alert.alert("Add something to share", "Enter a message first.");
      return;
    }

    try {
      const result = await Share.share({ message, title: "Share Message" });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared", `Activity: ${result.activityType}`);
        } else {
          Alert.alert("Shared", "Message sent successfully.");
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Share failed", "Please try again.");
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Share</Text>
        <Text style={styles.subtitle}>Craft a message and share it out</Text>
      </View>

      <View style={styles.contentCard}>
        <TextInput
          placeholder="Enter text to share"
          placeholderTextColor={colors.muted}
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Preview</Text>
          <Text style={styles.previewValue}>
            {message.trim() ? message : "Nothing yet—type to preview"}
          </Text>
        </View>

        <Pressable style={styles.actionButton} onPress={shareMessage}>
          <Text style={styles.actionText}>Share message</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ShareScreen;

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
      gap: 16,
    },
    input: {
      width: "100%",
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor:
        colors.card === "#ffffff" ? "#f8fafc" : "rgba(255,255,255,0.08)",
      color: colors.text,
      fontSize: 16,
    },
    preview: {
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor:
        colors.card === "#ffffff" ? "#f8fafc" : "rgba(255,255,255,0.04)",
    },
    previewLabel: {
      color: colors.muted,
      fontSize: 14,
      marginBottom: 6,
    },
    previewValue: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
    },
    actionButton: {
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.accent,
      alignItems: "center",
    },
    actionText: {
      color: colors.accentText,
      fontSize: 16,
      fontWeight: "700",
    },
  });
