import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const favorites = pgTable("favorites", {
  id: serial().primaryKey(),
  userId: text().notNull(),
  recipeId: text().notNull(),
  title: text().notNull(),
  image: text().notNull(),
  cookTime: text().notNull(),
  servings: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
