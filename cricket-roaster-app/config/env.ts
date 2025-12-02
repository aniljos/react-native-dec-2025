import { Platform } from "react-native";

export const baseUrl = Platform.OS === "ios" ? "http://localhost:9000" : "http://10.0.2.2:9000";