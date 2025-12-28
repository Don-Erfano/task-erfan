"use client";

import { FC, useState } from "react";
import { LogsTable } from "@/components";
import { getLogs } from "@/helper/logger";
import { LogItem } from "./interface";

const LogsPage: FC = () => {
  const [logs] = useState<LogItem[]>(() => getLogs());

  return (
    <div className="p-2">
      <h1 className="mb-4 text-xl font-bold">Logs</h1>
      <LogsTable logs={logs} />
    </div>
  );
};

export default LogsPage;
