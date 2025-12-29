"use client";

import { FC, useEffect, useState } from "react";
import { addToast, Button, Card, Divider, Form, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues } from "./interface";
import { loginSchema } from "./schema";
import { addLog } from "@/common/logger";

const LoginForm: FC = () => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [shouldSetAuthCookie, setShouldSetAuthCookie] = useState(false);

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!shouldSetAuthCookie) return;
    addLog("LOGIN", "User logged in");
    addToast({
      title: "Login successful!",
      description: "Welcome back to your dashboard",
      color: "success",
      variant: "bordered",
      timeout: 4000,
    });
    document.cookie = "auth=true; path=/; max-age=86400";
    router.push("/dashboard");
  }, [shouldSetAuthCookie, router]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoginError(null);
    await new Promise((res) => setTimeout(res, 800));
    const storedUser = localStorage.getItem("registeredUser");
    if (!storedUser) {
      setLoginError("No user found. Please register first.");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (
      parsedUser.email !== data.email ||
      parsedUser.password !== data.password
    ) {
      setLoginError("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: true,
        user: {
          email: parsedUser.email,
          name: parsedUser.name ?? "User",
        },
        token: crypto.randomUUID(),
      }),
    );

    setShouldSetAuthCookie(true);
  };

  return (
    <Card className="flex w-75 flex-col items-center justify-center gap-3 bg-foreground-50 p-3 text-gray-950 shadow-[1px_1px_6px_5px_rgba(59,130,246,0.5)] sm:w-full sm:p-6">
      <h1 className="text-center text-xl font-bold">Login Form</h1>
      <p className="text-center text-sm text-gray-600">Welcome</p>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="email"
              placeholder="example@email.com"
              variant="bordered"
              labelPlacement="outside-top"
              color="primary"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={
                <Icon
                  icon="material-symbols-light:alternate-email"
                  className="size-5"
                />
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="password"
              placeholder="password..."
              variant="bordered"
              labelPlacement="outside-top"
              color="primary"
              type={isVisiblePassword ? "text" : "password"}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={
                <Icon icon="solar:lock-password-linear" className="size-5" />
              }
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  type="button"
                  onPress={() => setIsVisiblePassword((prev) => !prev)}
                >
                  <Icon
                    icon={
                      isVisiblePassword
                        ? "fluent:eye-off-16-regular"
                        : "iconoir:eye"
                    }
                    className="size-5"
                  />
                </Button>
              }
            />
          )}
        />
        {loginError && (
          <p className="text-sm text-red-500 text-center">{loginError}</p>
        )}
        <Button
          color="primary"
          type="submit"
          className="mt-4 text-[16px]"
          fullWidth
          variant="bordered"
          isLoading={isSubmitting}
          startContent={<Icon icon="jam:arrow-left" width="24" height="24" />}
        >
          Login
        </Button>
      </Form>

      <Divider className="my-2" />

      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-sm text-gray-400">
          Not a member? register first
        </span>
        <Button
          color="primary"
          className="mt-2 text-[16px]"
          fullWidth
          variant="solid"
          onPress={handleRegister}
          startContent={
            <Icon icon="fluent:person-add-32-regular" width="20" height="20" />
          }
        >
          Register
        </Button>
      </div>
    </Card>
  );
};

export default LoginForm;
