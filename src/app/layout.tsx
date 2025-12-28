import "./globals.css";
import { ReactNode } from "react";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient, QueryProvider } from "@/providers";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const serverQueryClient = createQueryClient();
  const dehydratedState = dehydrate(serverQueryClient);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider dehydratedState={dehydratedState}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
