"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/lib/trpc";

export default function Home() {
  const trpc = useTRPC();

  const userQuery = useQuery(trpc.userList.queryOptions("test"));

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
