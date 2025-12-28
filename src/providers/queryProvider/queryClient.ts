import { QueryClient, QueryCache } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (
          (error as AxiosError).code === "ERR_NETWORK" &&
          typeof window !== undefined
        ) {
          window.location.replace("/error/network");
        }
        console.error("Query error", query.queryKey, error);
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 0,
        retry: 1,
        refetchOnReconnect: false,
        retryDelay: 0,
        throwOnError() {
          return false;
        },
      },
      mutations: { retry: 1 },
    },
  });
}
