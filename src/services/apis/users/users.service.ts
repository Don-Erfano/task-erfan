import { AxiosResponse } from "axios";
import { AbstractAPI, INetworkResponse, User, UsersResponse } from "@/services";

export class UsersService extends AbstractAPI {
  constructor() {
    super(`/users`);
  }

  /**
   * get all users
   */
  public async getUsers(): Promise<
    AxiosResponse<INetworkResponse<UsersResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}`,
    });
  }

  /**
   * get user by id
   */
  public async getUserById(id: number): Promise<AxiosResponse<User>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}`,
    });
  }
}
