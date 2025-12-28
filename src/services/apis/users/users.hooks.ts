import { useQuery } from "@tanstack/react-query";
import { UsersService } from "./users.service";
import { User, UsersResponse } from "./interface";

const usersService = new UsersService();

/**
 * get all users
 */
export const useUsers = () =>
  useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await usersService.getUsers();
      const payload = response.data;
      return Array.isArray(payload) ? payload : payload.data;
    },
  });

/**
 * get user by id
 */
export const useUserById = (id: number) =>
  useQuery<User>({
    queryKey: ["useUserById", id],
    queryFn: async () => {
      const response = await usersService.getUserById(id);
      return response.data;
    },
    enabled: !!id,
  });
