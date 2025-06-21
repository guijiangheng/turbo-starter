import { Platform } from "react-native";

export function getHost() {
  if (Platform.OS === "android") {
    return "10.0.2.2";
  }

  return "localhost";
}
