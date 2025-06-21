import { and, eq } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "./db";
import { favorites } from "./schema";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  favorite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        recipeId: z.string(),
        title: z.string(),
        image: z.string(),
        cookTime: z.string(),
        servings: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const [record] = await db
        .insert(favorites)
        .values({
          userId: input.userId,
          recipeId: input.recipeId,
          title: input.title,
          image: input.image,
          cookTime: input.cookTime,
          servings: input.servings,
        })
        .returning();

      return record;
    }),

  getFavorites: publicProcedure.input(z.string()).query(({ input }) => {
    console.log(input, "input");
    return db.select().from(favorites).where(eq(favorites.userId, input));
  }),

  deleteFavorite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        recipeId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.userId, input.userId),
            eq(favorites.recipeId, input.recipeId),
          ),
        );
    }),
});

export type AppRouter = typeof appRouter;
