import axios from "axios";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BASE_URL } from "../config/api";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "../../state/authSlice";
import { useThemePreference, ColorPalette } from "../../hooks/useThemePreference";

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const canSubmit = username.trim() && password.trim();

  const handleLogin = async () => {
    if (!canSubmit || loading) {
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        name: username.trim(),
        password: password,
      });
      const { accessToken, refreshToken } = response.data ?? {};

      if (!accessToken || !refreshToken) {
        throw new Error("Missing tokens in response");
      }

      dispatch(
        setAuth({
          userName: username.trim(),
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      );
      setMessage("Logged in successfully.");
      setTimeout(() => {
        router.replace("/");
      }, 500);
    } catch (error) {
      dispatch(clearAuth());
      Alert.alert("Login failed", "Check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor={colors.muted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Pressable
            style={[styles.button, !canSubmit || loading ? styles.buttonDisabled : null]}
            onPress={handleLogin}
            disabled={!canSubmit || loading}
          >
            <Text style={styles.buttonText}>{loading ? "Signing in..." : "Login"}</Text>
          </Pressable>

          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const createStyles = (colors: ColorPalette) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    flexGrow: 1,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 28,
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
  card: {
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
  field: {
    gap: 8,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
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
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.accentText,
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    color: colors.success,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
