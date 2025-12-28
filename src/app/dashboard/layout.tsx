"use client";

import { PropsWithChildren, useEffect } from "react";
import { FooterNav, Sidebar, ThemeSwitch } from "@/components";
import { usePathname } from "next/navigation";
import { addLog } from "@/helper/logger";

const Layout = ({ children }: Readonly<PropsWithChildren>) => {
  const pathname = usePathname();
  useEffect(() => {
    addLog("PAGE_VIEW", "Page visited", pathname);
  }, [pathname]);
  return (
    <div className="flex min-h-screen w-full bg-background-200 text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex min-h-screen flex-1 flex-col bg-background-300">
        <section className="flex-1 bg-background-100/80 p-2">
          <div className="md:hidden flex flex-row-reverse ">
            <ThemeSwitch />
          </div>
          {children}
        </section>
      </main>
      <FooterNav />
    </div>
  );
};

export default Layout;
