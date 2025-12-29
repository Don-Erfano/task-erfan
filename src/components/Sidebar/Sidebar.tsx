"use client";

import { FC, useCallback } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeSwitch } from "@/components";
import { useRouter, usePathname } from "next/navigation";
import { addLog } from "@/common/logger";

const Sidebar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(() => {
    addLog("LOGOUT", "User logged out");
    localStorage.removeItem("auth");
    document.cookie = "auth=; path=/; max-age=0";

    router.replace("/auth/login");
  }, [router]);

  const isUsersActive = pathname === "/dashboard";
  const isLogsActive = pathname.startsWith("/dashboard/logs");

  return (
    <aside className="border-background-300 sticky top-0 right-0 z-40 flex h-screen w-64 flex-col gap-4 border-r bg-background-100/80 p-4 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-center gap-3 w-full">
        <h1 className="text-lg text-primary-600">Erfan Code Challenge</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <Button
          onPress={() => router.push("/dashboard")}
          variant="light"
          fullWidth
          data-active={isUsersActive}
          className="justify-start gap-2 rounded-2xl px-3 py-2 text-sm font-medium
              text-foreground hover:bg-primary/10
              data-[active=true]:bg-primary
              data-[active=true]:text-primary-foreground"
        >
          <Icon icon="gravity-ui:persons" className="text-lg" />
          Users
        </Button>

        <Button
          onPress={() => router.push("/dashboard/logs")}
          variant="light"
          fullWidth
          data-active={isLogsActive}
          className="justify-start gap-2 rounded-2xl px-3 py-2 text-sm font-medium
              text-foreground hover:bg-primary/10
              data-[active=true]:bg-primary
              data-[active=true]:text-primary-foreground"
        >
          <Icon icon="ix:log" className="text-lg" />
          Logs
        </Button>
      </nav>

      <div className="flex items-center mb-4 justify-center">
        <ThemeSwitch />
      </div>

      <Button
        size="sm"
        variant="bordered"
        color="danger"
        radius="md"
        className="text-danger hover:bg-danger/10"
        onPress={handleLogout}
        startContent={
          <Icon icon="solar:logout-2-linear" width={20} height={20} />
        }
      >
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
