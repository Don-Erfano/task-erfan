import { AxiosError, AxiosRequestConfig } from "axios";
import { IMiddleware } from "@/services/interceptor/http/middlewares/interface";
import { INetworkResponse } from "@/services/interceptor";

export default class ErrorMiddleware implements IMiddleware {
  async onResponseError(
    error: AxiosError<INetworkResponse<null>>,
  ): Promise<AxiosRequestConfig | void> {
    const { response } = error;

    if (/5[0-9][0-9]/.test(String(response?.status))) {
      if (typeof window !== "undefined") {
        window.location.replace("/error/e5xx");
        return;
      }
    }

    throw error;
  }
}
