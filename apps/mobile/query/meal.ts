import { MealAPI } from "@/api/meal";
import { queryOptions } from "@tanstack/react-query";

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: MealAPI.getCategories,
  select: (categories) =>
    categories.map((category: any) => ({
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      name: category.strCategory,
      image: category.strCategoryThumb,
      description: category.strCategoryDescription,
    })),
});

export const featureMealQuery = queryOptions({
  queryKey: ["feature-meal"],
  queryFn: MealAPI.getRandomMeal,
  select: MealAPI.transformMealData,
});

export const recipesQuery = (count: number) =>
  queryOptions({
    queryKey: ["random-meals", count],
    queryFn: () => MealAPI.getRandomMeals(count),
    select: (meals: any[]) =>
      meals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((x) => x !== null),
  });

export const searchQuery = (query: string) => queryOptions({
  queryKey: ["search", query],
  queryFn: async () => {
    if (!query.trim()) {
      return MealAPI.getRandomMeals(12);
    }

    const nameSearchResult = await MealAPI.searchMealsByName(query);

    if (nameSearchResult.length) {
      return nameSearchResult
    }

    const ingredientSearchResult = await MealAPI.filterByIngredient(query);

    return ingredientSearchResult.slice(0, 12);
  },
  select: (meals: any[]) =>
    meals
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((x) => x !== null),
})
