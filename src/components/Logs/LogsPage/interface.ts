export type LogType = "LOGIN" | "LOGOUT" | "PAGE_VIEW";

export interface LogItem {
  id: string;
  type: LogType;
  message: string;
  path?: string;
  createdAt: string;
}
