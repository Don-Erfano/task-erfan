"use client";

import { FC, PropsWithChildren, useMemo } from "react";
import { QueryClientProvider, hydrate } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createQueryClient } from "@/providers/queryProvider/queryClient";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export interface QueryProviderProps {
  dehydratedState: unknown;
}

const QueryProvider: FC<PropsWithChildren<QueryProviderProps>> = ({
  children,
  dehydratedState,
}) => {
  const queryClient = useMemo(() => createQueryClient(), []);
  hydrate(queryClient, dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="theme"
        disableTransitionOnChange
        value={{
          light: "light",
          dark: "dark",
        }}
      >
        <HeroUIProvider>
          <ToastProvider placement="top-left" />
          {children}
        </HeroUIProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};
export default QueryProvider;
