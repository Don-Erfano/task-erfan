"use client";

import { FC } from "react";
import { UserInfoProps } from "./interface";

const UserInfo: FC<UserInfoProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-default-500">{label}</span>
      <span className="font-medium text-foreground">{value || "-"}</span>
    </div>
  );
};
export default UserInfo;
