import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMiddleware } from "../middlewares";

/**
 * Interface for HttpClient to ensure implementation consistency.
 * Defines the structure for making HTTP requests and managing middleware.
 */
export interface IHttpClient {
  /**
   * Boots the HTTP client, preparing it for making requests.
   * This typically includes applying any middleware.
   */
  boot(): void;

  /**
   * Makes an HTTP request with the given configuration.
   * @param config The Axios request configuration.
   * @returns A Promise that resolves to the Axios response.
   */
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R>;

  /**
   * A property or method to manage middleware.
   * This could be a property that allows adding middleware before the client is booted.
   */
  readonly middlewares: Set<IMiddleware>;
}
