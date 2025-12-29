import HttpClient, { appClient } from "../http";

export default abstract class AbstractAPI {
  protected constructor(
    protected readonly url: string,
    protected readonly http: HttpClient = appClient,
  ) {}
}
