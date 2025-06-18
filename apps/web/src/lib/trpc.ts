import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { AppRouter } from "@repo/backend/router";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
