import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { MealAPI } from "@/api/meal";
import { COLORS } from "@/colors";
import { Ionicons } from "@expo/vector-icons";

type RecipeDto = NonNullable<ReturnType<typeof MealAPI.transformMealData>>;

interface Props {
  recipe: RecipeDto;
}

export function RecipeCard({ recipe }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.description && (
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        <View style={styles.footer}>
          {recipe.cookTime && (
            <View style={styles.timeContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={styles.timeText}>{recipe.cookTime}</Text>
            </View>
          )}
          {recipe.servings && (
            <View style={styles.servingsContainer}>
              <Ionicons
                name="people-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={styles.servingsText}>{recipe.servings}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: 140,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: "500",
  },
  servingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingsText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: "500",
  },
});
