import { UserRepository as IUserRepository } from "@/modules/users/domain/interfaces/UserRepository";
import { loginUser } from "@/modules/users/infrastructure/api/UserApi";
import { User } from "@/modules/users/domain/entities/user";

export class UserRepository extends IUserRepository {
  async login({ username, password }) {
    const response = await loginUser({ username, password });

    // The fix is here: check for response.data.user
    if (!response || !response.data || !response.data.user) {
      throw new Error("Login failed: Invalid response from server.");
    }

    // Get the user and token from response.data
    const user = new User(response.data.user);
    const accessToken = response.data.access_token;

    return {
      access_token: accessToken,
      user,
    };
  }
}