import { useEffect, useMemo, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ThemeMode, setTheme, toggleTheme } from "../state/themeSlice";

const STORAGE_KEY = "app_theme_preference";

const palettes = {
  dark: {
    background: "#0b1220",
    card: "rgba(255,255,255,0.06)",
    cardStrong: "rgba(15,23,42,0.95)",
    border: "rgba(255,255,255,0.1)",
    text: "#e2e8f0",
    muted: "#94a3b8",
    accent: "#2563eb",
    accentText: "#f8fafc",
    success: "#22c55e",
    shadow: "#0f172a",
    modalBackdrop: "rgba(0,0,0,0.5)",
  },
  light: {
    background: "#f8fafc",
    card: "#ffffff",
    cardStrong: "#ffffff",
    border: "rgba(15,23,42,0.08)",
    text: "#0f172a",
    muted: "#475569",
    accent: "#2563eb",
    accentText: "#f8fafc",
    success: "#16a34a",
    shadow: "#0f172a",
    modalBackdrop: "rgba(0,0,0,0.35)",
  },
};

export type ColorPalette = typeof palettes.dark;

export const useThemePreference = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
          dispatch(setTheme(saved as ThemeMode));
        }
      } catch {
        // ignore storage errors
      } finally {
        setHydrated(true);
      }
    })();
  }, [dispatch]);

  const persistTheme = useCallback(
    async (nextMode: ThemeMode) => {
      dispatch(setTheme(nextMode));
      try {
        await AsyncStorage.setItem(STORAGE_KEY, nextMode);
      } catch {
        // ignore storage errors
      }
    },
    [dispatch]
  );

  const toggle = useCallback(() => {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    persistTheme(nextMode);
  }, [mode, persistTheme]);

  const colors = useMemo<ColorPalette>(() => palettes[mode], [mode]);

  return { mode, colors, toggleTheme: toggle, setTheme: persistTheme, hydrated };
};
