import { MealAPI } from "@/api/meal";
import { queryOptions } from "@tanstack/react-query";

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: MealAPI.getCategories,
  select: (categories) =>
    categories.map((category: any) => ({
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

export const randomMealsQuery = (count: number) =>
  queryOptions({
    queryKey: ["random-meals", count],
    queryFn: () => MealAPI.getRandomMeals(count),
    select: (meals: any[]) =>
      meals.map((meal) => MealAPI.transformMealData(meal)),
  });
