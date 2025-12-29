import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";
import { IMiddleware } from "../middlewares";
import { IHttpClient } from "./interface";

/**
 * Represents an HTTP client to make requests using Axios as the underlying adapter.
 * Allows for the addition of middleware to intercept requests and responses.
 *
 * @class HttpClient
 * @implements {IHttpClient}
 */

export default class HttpClient implements IHttpClient {
  /**
   * The Axios instance used by the HTTP client.
   *
   * @private
   * @type {AxiosInstance}
   */
  private readonly adapter: AxiosInstance;

  /**
   * A set of middleware objects that are applied to the Axios instance.
   *
   * @private
   * @type {Set<IMiddleware>}
   */
  private readonly _middlewares: Set<IMiddleware> = new Set<IMiddleware>();

  /**
   * Indicates whether the HttpClient has been booted and is ready to make requests.
   *
   * @private
   * @type {boolean}
   */
  private isBooted: boolean;

  /**
   * Creates an instance of HttpClient.
   * Initializes the Axios adapter with provided configuration and sets the booted flag to false.
   *
   * @param {CreateAxiosDefaults} config The Axios configuration used to create the Axios instance.
   */
  constructor(config: CreateAxiosDefaults) {
    this.isBooted = false;
    this.adapter = axios.create(config);
  }

  /**
   * Provides access to the middleware set. Middleware can only be added before the HttpClient is booted.
   *
   * @public
   * @throws {Error} Throws an error if trying to access middleware after the client has been booted.
   * @returns {Set<IMiddleware>} The set of middleware.
   */
  public get middlewares(): Set<IMiddleware> {
    if (this.isBooted) {
      throw new Error(`Cannot add middleware after boot!`);
    }

    return this._middlewares;
  }

  /**
   * Boots the HttpClient, registering any middleware added to the Axios instance.
   * After this method is called, no more middleware can be added.
   *
   * @public
   */
  public boot() {
    this.middlewares?.forEach((mw) => {
      const env = mw.environment || process.env.NODE_ENV;
      if (env === process.env.NODE_ENV) {
        this.adapter.interceptors.request.use(mw.onRequest, mw.onRequestError);
        this.adapter.interceptors.response.use(
          mw.onResponse,
          mw.onResponseError,
        );
      }
    });

    this.isBooted = true;
  }

  /**
   * Makes an HTTP request using the Axios instance.
   *
   * @template T The expected response data type.
   * @template R The Axios response type, defaulting to AxiosResponse<T>.
   * @param {AxiosRequestConfig} config The Axios request configuration.
   * @throws {Error} Throws an error if the HttpClient has not been booted yet.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    if (!this.isBooted) {
      throw new Error(`HttpAdapter not yet booted!`);
    }
    return this.adapter.request(config);
  }
}
