"use client";
import { PropsWithChildren } from "react";
import { ThemeSwitch } from "@/components";

const Layout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <>
      <nav className="sticky top-0 z-50 flex h-10 w-full items-center justify-start bg-background-200/20 p-6 shadow-lg backdrop-blur-md">
        <ThemeSwitch />
      </nav>
      <main className="flex min-h-screen w-full items-center justify-center bg-background-200">
        {children}
      </main>
    </>
  );
};
export default Layout;
