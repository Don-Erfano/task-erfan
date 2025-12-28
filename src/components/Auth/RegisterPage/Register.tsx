import { FC } from "react";
import { RegisterForm } from "@/components";

const Register: FC = () => {
  return (
    <div className="flex w-75 items-center justify-center text-sm text-foreground sm:w-125">
      <RegisterForm />
    </div>
  );
};
export default Register;
