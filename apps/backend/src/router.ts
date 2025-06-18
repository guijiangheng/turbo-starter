import { z } from "zod/v4";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  userList: publicProcedure.input(z.string()).query((opts) => {
    console.log(opts.input);
    return { name: "123" };
  }),
});

export type AppRouter = typeof appRouter;
