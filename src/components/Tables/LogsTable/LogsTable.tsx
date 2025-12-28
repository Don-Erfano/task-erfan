"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import { FC, useMemo, useState } from "react";
import { LogsTableProps } from "@/components";

const ROWS_PER_PAGE = 5;

const LogsTable: FC<LogsTableProps> = ({ logs }) => {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(logs.length / ROWS_PER_PAGE);

  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return logs.slice(start, end);
  }, [page, logs]);

  return (
    <Table
      bottomContent={
        logs.length > ROWS_PER_PAGE ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: "min-h-[260px]",
      }}
    >
      <TableHeader>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>MESSAGE</TableColumn>
        <TableColumn>PATH</TableColumn>
        <TableColumn>DATE</TableColumn>
      </TableHeader>

      <TableBody items={items} emptyContent="No logs found">
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>{item.path ?? "-"}</TableCell>
            <TableCell>{new Date(item.createdAt).toISOString()}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LogsTable;
