import { FC } from "react";
import { LoginProps } from "./interface";
import { LoginForm } from "@/components";

const Login: FC<LoginProps> = () => {
  return (
    <div className="flex w-75 items-center justify-center text-sm text-foreground sm:w-125">
      <LoginForm />
    </div>
  );
};
export default Login;
