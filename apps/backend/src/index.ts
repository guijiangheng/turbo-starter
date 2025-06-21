import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { env } from "./env";
import { appRouter } from "./router";

const server = createHTTPServer({
  basePath: "/trpc/",
  middleware: cors(),
  router: appRouter,
});

server.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
