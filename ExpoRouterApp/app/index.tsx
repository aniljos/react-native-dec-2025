import { Link } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../state/authSlice";
import { RootState } from "../state/store";
import { useThemePreference, ColorPalette } from "../hooks/useThemePreference";

export default function Index() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const { colors, mode, toggleTheme } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const pages = [
    { href: "/info", label: "Info" },
    { href: "/auth/login", label: "Login" },
    { href: "/dimensions", label: "Dimensions" },
    { href: "/linking", label: "Linking" },
    { href: "/share", label: "Share" },
    { href: "/products", label: "Products" },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Expo Router Application</Text>
        {auth.isAuthenticated && auth.userName ? (
          <Text style={styles.welcome}>
            Welcome, {auth.userName}. Explore the feature demos below
          </Text>
        ) : (
          <Text style={styles.subtitle}>Explore the feature demos below</Text>
        )}
        <View style={styles.headerRow}>
          {auth.isAuthenticated && (
            <Pressable
              onPress={() => {
                dispatch(clearAuth());
                setShowModal(true);
              }}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          )}
          <View style={styles.themeToggle}>
            <Text style={styles.toggleLabel}>
              Theme: {mode === "dark" ? "Dark" : "Light"}
            </Text>
            <Switch
              value={mode === "dark"}
              onValueChange={toggleTheme}
              thumbColor={mode === "dark" ? colors.accent : "#e2e8f0"}
              trackColor={{ false: "#cbd5e1", true: colors.accent }}
            />
          </View>
        </View>
      </View>

      <View style={styles.linkList}>
        {pages.map((page) => (
          <Link key={page.href} href={page.href} asChild>
            <Pressable style={styles.linkCard}>
              <Text style={styles.linkLabel}>{page.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Logged out</Text>
            <Text style={styles.modalBody}>
              You have been signed out successfully.
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
      marginBottom: 40,
      gap: 8,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      marginTop: 2,
      fontSize: 16,
      color: colors.muted,
    },
    welcome: {
      marginTop: 2,
      fontSize: 16,
      color: colors.accent,
      fontWeight: "700",
    },
    logoutButton: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor:
        colors.card === "#ffffff" ? "#eef2ff" : "rgba(255,255,255,0.08)",
    },
    logoutText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
    themeToggle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    toggleLabel: {
      color: colors.muted,
      fontSize: 14,
      fontWeight: "600",
    },
    linkList: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: 420,
      alignSelf: "center",
    },
    linkCard: {
      width: "100%",
      maxWidth: 360,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.45,
      shadowRadius: 16,
      elevation: 6,
      marginBottom: 16,
    },
    linkLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: colors.modalBackdrop,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    modalCard: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: colors.cardStrong,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
    },
    modalTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 8,
    },
    modalBody: {
      color: colors.muted,
      fontSize: 15,
      marginBottom: 16,
    },
    modalButton: {
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.accent,
      alignItems: "center",
    },
    modalButtonText: {
      color: colors.accentText,
      fontSize: 15,
      fontWeight: "700",
    },
  });
