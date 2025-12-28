import { LogItem, LogType } from "@/components";

const STORAGE_KEY = "app_logs";

export const addLog = (type: LogType, message: string, path?: string) => {
  if (typeof window === "undefined") return;
  const logs: LogItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const newLog: LogItem = {
    id: crypto.randomUUID(),
    type,
    message,
    path,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newLog, ...logs]));
};

export const getLogs = (): LogItem[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};
