import { COLORS } from "@/colors";
import { ComponentProps } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
  message?: string;
  size?: ComponentProps<typeof ActivityIndicator>["size"];
}

export function LoadingSpinner({ message = "Loading...", size }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color={COLORS.primary} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: COLORS.background,
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
