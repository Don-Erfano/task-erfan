"use client";

import { FC, useState } from "react";
import { RegisterFormValues } from "./interface";
import { addToast, Button, Card, Divider, Form, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema";

const RegisterForm: FC = () => {
  const router = useRouter();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const toggleVisibilityPassword = () => setIsVisiblePassword((prev) => !prev);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setRegisterError(null);
    await new Promise((res) => setTimeout(res, 800));
    const storedUser = localStorage.getItem("registeredUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === data.email) {
        setRegisterError("This email is already registered");
        return;
      }
    }

    const userToStore = {
      name: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("registeredUser", JSON.stringify(userToStore));
    addToast({
      title: "Registration successful!",
      description: "You can now log in with your account",
      color: "success",
      variant: "bordered",
      timeout: 4000,
    });
    router.push("/auth/login");
  };

  return (
    <Card className="flex w-75 flex-col items-center justify-center gap-3 bg-foreground-50 p-3 text-gray-950 shadow-[1px_1px_6px_5px_rgba(59,130,246,0.5)] sm:w-full sm:p-6">
      <h1 className="text-center text-xl font-bold">Create New Account</h1>

      <Form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              color="primary"
              variant="bordered"
              labelPlacement="outside-top"
              label="username"
              placeholder="username..."
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              startContent={
                <Icon
                  icon="solar:user-linear"
                  className="size-5 text-gray-950"
                />
              }
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              color="primary"
              variant="bordered"
              labelPlacement="outside-top"
              label="email"
              placeholder="example@email.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={
                <Icon
                  icon="material-symbols-light:alternate-email"
                  className="size-5 text-gray-950"
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
              color="primary"
              variant="bordered"
              placeholder="password..."
              labelPlacement="outside-top"
              label="password"
              type={isVisiblePassword ? "text" : "password"}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={
                <Icon
                  icon="solar:lock-password-linear"
                  className="size-5 text-gray-950"
                />
              }
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  type="button"
                  onPress={toggleVisibilityPassword}
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              color="primary"
              variant="bordered"
              placeholder="Re-enter your password"
              labelPlacement="outside-top"
              label="confirm password"
              type={isVisibleConfirmPassword ? "text" : "password"}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              startContent={
                <Icon
                  icon="solar:lock-password-linear"
                  className="size-5 text-gray-950"
                />
              }
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  type="button"
                  onPress={toggleVisibilityConfirmPassword}
                >
                  <Icon
                    icon={
                      isVisibleConfirmPassword
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

        {registerError && (
          <p className="text-sm text-red-500 text-center">{registerError}</p>
        )}

        <Button
          color="primary"
          type="submit"
          className="my-2 text-[16px]"
          fullWidth
          variant="bordered"
          isLoading={isSubmitting}
          startContent={
            <Icon icon="fluent:person-add-32-regular" width="20" height="20" />
          }
        >
          Register
        </Button>
      </Form>

      <Divider className="rounded-full bg-gray-500" />

      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="text-medium text-gray-400">Already have an account?</h1>
        <Button
          color="primary"
          type="button"
          fullWidth
          variant="solid"
          onPress={handleLogin}
          startContent={<Icon icon="jam:arrow-left" width="24" height="24" />}
        >
          Login
        </Button>
      </div>
    </Card>
  );
};

export default RegisterForm;
