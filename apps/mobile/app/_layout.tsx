import { Slot } from "expo-router";
import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SafeScreen } from "@/components/SafeScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
