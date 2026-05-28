// lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";
import { queryFn } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryFn: queryFn as any,
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
