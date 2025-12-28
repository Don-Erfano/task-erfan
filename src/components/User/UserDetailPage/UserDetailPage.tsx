"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardBody, Divider, Spinner } from "@heroui/react";

import { UserInfo } from "@/components/User";
import { useUserById } from "@/services/apis/users";

const UserDetailPage: FC = () => {
  const router = useRouter();
  const params = useParams();

  const userId = Number(params?.id);
  const { data, isLoading, isError } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen text-sm flex items-center justify-center m-auto text-default-500">
        <Spinner size="lg" variant="wave" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center m-auto sm:p-4 text-sm text-red-500/60">
        Error Fetch Data
      </div>
    );
  }

  const user = "data" in data ? data.data : data;

  return (
    <div className="p-2 sm:mb-0 mb-16 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">User Details</h1>

        <Button
          size="sm"
          variant="ghost"
          color="primary"
          onPress={() => router.back()}
        >
          Back
        </Button>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <section>
            <h2 className="font-semibold mb-2">User {user.id} Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <UserInfo label="Name" value={user.name} />
              <UserInfo label="Username" value={user.username} />
              <UserInfo label="Email" value={user.email} />
              <UserInfo label="Phone" value={user.phone} />
              <UserInfo label="Website" value={user.website} />
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="font-semibold mb-2">Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <UserInfo label="Street" value={user.address.street} />
              <UserInfo label="Suite" value={user.address.suite} />
              <UserInfo label="City" value={user.address.city} />
              <UserInfo label="Zip Code" value={user.address.zipcode} />
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="font-semibold mb-2">Company</h2>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <UserInfo label="Name" value={user.company.name} />
              <UserInfo label="Catch Phrase" value={user.company.catchPhrase} />
              <UserInfo label="Business" value={user.company.bs} />
            </div>
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetailPage;
