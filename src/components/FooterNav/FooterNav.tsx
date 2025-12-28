"use client";

import { FC, useCallback } from "react";
import { navItems } from "./constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { addLog } from "@/helper/logger";

const FooterNav: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    addLog("LOGOUT", "User logged out");
    localStorage.removeItem("auth");
    document.cookie = "auth=; path=/; max-age=0";
    router.replace("/auth/login");
  }, [router]);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-background-200 px-2 py-1.5 text-xs shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur-3xl md:hidden">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-2xl text-base transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-transparent text-foreground/70",
                ].join(" ")}
              >
                <Icon icon={item.icon} width={20} height={20} />
              </div>
              <span
                className={[
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-foreground/60",
                ].join(" ")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        <Button
          variant="light"
          color="danger"
          size="sm"
          radius="full"
          onPress={handleLogout}
          className="flex-col px-0 text-[10px] overflow-visible gap-2"
          startContent={
            <div>
              <Icon icon="solar:logout-2-linear" width={20} height={20} />
            </div>
          }
        >
          Logout
        </Button>
      </nav>
    </>
  );
};

export default FooterNav;
