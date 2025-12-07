
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useThemePreference, ColorPalette } from "../../hooks/useThemePreference";

const DimensionsScreen = () => {
  const window = useWindowDimensions();
  const [orientationOverride, setOrientationOverride] = useState<
    "auto" | "portrait" | "landscape"
  >("auto");
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const orientation = useMemo(() => {
    if (orientationOverride !== "auto") {
      return orientationOverride;
    }
    return window.height >= window.width ? "portrait" : "landscape";
  }, [orientationOverride, window.height, window.width]);

  const isPortrait = orientation === "portrait";

  const cycleOrientation = () => {
    setOrientationOverride((current) => {
      if (current === "auto") return "portrait";
      if (current === "portrait") return "landscape";
      return "auto";
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Dimensions</Text>
        <Text style={styles.subtitle}>
          Current view: {isPortrait ? "Portrait" : "Landscape"}
        </Text>
      </View>

      {isPortrait ? (
        <View style={styles.contentWrapper}>
            <View style={styles.contentCard}>
              <View
                style={[
                  styles.inputContainerBase,
                  isPortrait
                  ? styles.inputContainerPortrait
                  : styles.inputContainerLandscape,
              ]}
            >
              <TextInput
                placeholder="Enter a message"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />

              <Pressable
                style={[
                  styles.actionButton,
                  isPortrait
                    ? styles.actionButtonFull
                    : styles.actionButtonCompact,
                ]}
                onPress={() => alert("Sent!")}
              >
                <Text style={styles.actionText}>Send</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.orientationHelper}
              onPress={cycleOrientation}
            >
              <Text style={styles.helperLabel}>Test orientation</Text>
              <Text style={styles.helperValue}>
                {orientationOverride === "auto"
                  ? "Following device"
                  : `Forced ${orientationOverride}`}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentCard}>
            <View style={[styles.inputContainerBase, styles.inputContainerLandscape]}>
              <TextInput
                placeholder="Enter a message"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />

              <Pressable
                style={[styles.actionButton, styles.actionButtonCompact]}
                onPress={() => alert("Sent!")}
              >
                <Text style={styles.actionText}>Send</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.orientationHelper}
              onPress={cycleOrientation}
            >
              <Text style={styles.helperLabel}>Test orientation</Text>
              <Text style={styles.helperValue}>
                {orientationOverride === "auto"
                  ? "Following device"
                  : `Forced ${orientationOverride}`}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DimensionsScreen;

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
    contentWrapper: {
      flex: 1,
      justifyContent: "center",
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 24,
    },
    contentCard: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
    },
    inputContainerBase: {
      width: "100%",
      maxWidth: 420,
      gap: 12,
    },
    inputContainerPortrait: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    inputContainerLandscape: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      minWidth: 180,
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
    actionButton: {
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.accent,
      alignItems: "center",
    },
    actionButtonFull: {
      width: "100%",
    },
    actionButtonCompact: {
      paddingHorizontal: 18,
      minWidth: 120,
      alignSelf: "flex-start",
    },
    actionText: {
      color: colors.accentText,
      fontSize: 16,
      fontWeight: "700",
    },
    orientationHelper: {
      marginTop: 20,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor:
        colors.card === "#ffffff" ? "#f8fafc" : "rgba(255,255,255,0.04)",
      width: "100%",
      maxWidth: 420,
    },
    helperLabel: {
      color: colors.muted,
      fontSize: 14,
      marginBottom: 6,
    },
    helperValue: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },
  });
