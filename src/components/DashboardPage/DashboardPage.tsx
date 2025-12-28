"use client";

import { FC, useMemo } from "react";
import { UserItem, UserTable } from "@/components";
import { useRouter } from "next/navigation";

import { useUsers } from "@/services/apis/users";
import { Spinner } from "@heroui/react";

const DashboardPage: FC = () => {
  const router = useRouter();
  const { data: users, isLoading, isError } = useUsers();

  const tableUsers: UserItem[] = useMemo(() => {
    if (!users) return [];

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }, [users]);

  const handleViewDetails = (user: UserItem) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen text-sm flex items-center justify-center m-auto text-default-500">
        <Spinner size="lg" variant="wave" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-2 sm:p-4 text-sm text-red-500/60">Error Fetch Data</div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">Users List</h1>
      <UserTable users={tableUsers} onViewDetails={handleViewDetails} />
    </div>
  );
};

export default DashboardPage;
