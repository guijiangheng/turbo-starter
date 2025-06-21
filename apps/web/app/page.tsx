"use client";

import type { JSX } from "react";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/lib/trpc";

export default function Home(): JSX.Element {
  const trpc = useTRPC();

  const userQuery = useQuery(trpc.getFavorites.queryOptions("sdf"));

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(userQuery.data, null, 2)}</code>
      </pre>
    </div>
  );
}
