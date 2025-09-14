import { UserRepository as IUserRepository } from "@/modules/users/domain/interfaces/UserRepository";
import { loginUser } from "@/modules/users/infrastructure/api/UserApi";
import { User } from "@/modules/users/domain/entities/user";

export class UserRepository extends IUserRepository {
  async login({ username, password }) {
    const body = await loginUser({ username, password });

    // Expecting direct body: { user, access_token }
    if (!body || !body.user || !body.access_token) {
      throw new Error("Login failed: Invalid response from server.");
    }

    const user = new User(body.user);
    const accessToken = body.access_token;

    return {
      access_token: accessToken,
      user,
    };
  }

  async logout() {
    const response = await logoutUser();
    if (!response || !response.success) {
      throw new Error("Logout failed: Invalid response from server.");
    }
  }
}