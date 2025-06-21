import { Image } from "expo-image";
import React, { Suspense, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";

import { COLORS } from "@/colors";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { categoriesQuery, featureMealQuery, recipesQuery } from "@/query/meal";
import { Ionicons } from "@expo/vector-icons";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeCard } from "@/components/RecipeCard";

function HomeViewImpl() {
  const queryClient = useQueryClient();

  const [{ data: categories }, { data: featuredRecipe }, { data: recipes }] =
    useSuspenseQueries({
      queries: [categoriesQuery, featureMealQuery, recipesQuery(6)],
    });

  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    () => categories[0].name ?? "",
  );

  function handleCategorySelect(category: string) {
    setSelectedCategory(category);
    queryClient.invalidateQueries(recipesQuery(6));
  }

  async function onRefresh() {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries(recipesQuery(6)),
      queryClient.invalidateQueries(categoriesQuery),
      queryClient.invalidateQueries(featureMealQuery),
    ]);
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.welcomeSection}>
          <Image
            source={require("../../assets/images/lamb.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Image
            source={require("../../assets/images/chicken.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Image
            source={require("../../assets/images/pork.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>

        {featuredRecipe && (
          <View style={styles.featuredSection}>
            <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
              <View style={styles.featuredImageContainer}>
                <Image
                  source={{ uri: featuredRecipe.image }}
                  style={styles.featuredImage}
                  contentFit="cover"
                  transition={500}
                />
              </View>
              <View style={styles.featuredOverlay}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Featured</Text>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle} numberOfLines={2}>
                    {featuredRecipe.title}
                  </Text>
                  <View style={styles.featuredMeta}>
                    <View style={styles.featuredMeta}>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={styles.metaText}>
                          {featuredRecipe.cookTime}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="people-outline"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={styles.metaText}>
                          {featuredRecipe.servings}
                        </Text>
                      </View>
                      {featuredRecipe.area && (
                        <View style={styles.metaItem}>
                          <Ionicons
                            name="location-outline"
                            size={16}
                            color={COLORS.white}
                          />
                          <Text style={styles.metaText}>
                            {featuredRecipe.area}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
        </View>

        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.recipesGrid}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="restaurant-outline"
                size={64}
                color={COLORS.textLight}
              />
              <Text style={styles.emptyTitle}>No recipes found</Text>
              <Text style={styles.emptyDescription}>
                Try a different category
              </Text>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
}

export default function HomeView() {
  return (
    <Suspense
      fallback={<LoadingSpinner message="Loading delicions recipes..." />}
    >
      <HomeViewImpl />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featuredCard: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.card,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  featuredImageContainer: {
    height: 240,
    backgroundColor: COLORS.primary,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  featuredBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 600,
  },
  featuredContent: {
    justifyContent: "flex-end",
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuredMeta: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: 600,
  },
  recipesSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  recipesGrid: {
    gap: 16,
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
