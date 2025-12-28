import type { Key } from "react";

export interface TableColumnItem {
  name: string;
  uid: Key;
}

export const columns: TableColumnItem[] = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ACTION", uid: "action" },
];
