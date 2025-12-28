"use client";

import { FC, Key, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@heroui/react";
import type { UserItem, UserTableProps } from "./interface";
import { columns } from "@/components/Tables/UserTable/constant";
import { Icon } from "@iconify/react";

const UserTable: FC<UserTableProps> = ({ users, onViewDetails }) => {
  const renderCell = useCallback(
    (user: UserItem, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm text-foreground">
                {user.name}
              </span>
            </div>
          );

        case "email":
          return <span className="text-sm text-default-500">{user.email}</span>;

        case "action":
          return (
            <div className="flex justify-center">
              <Tooltip content="View details">
                <Button
                  size="sm"
                  variant="ghost"
                  onPress={() => onViewDetails(user)}
                  className="text-sm hover:text-primary transition-colors"
                  startContent={<Icon icon="ph:eye" width="20" height="20" />}
                >
                  details
                </Button>
              </Tooltip>
            </div>
          );

        default:
          return null;
      }
    },
    [onViewDetails],
  );

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "action" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={users} emptyContent="No users found">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default UserTable;
