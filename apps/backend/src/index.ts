import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { env } from "./env";
import { appRouter } from "./router";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
