import { UserRepository as IUserRepository } from "@/modules/users/domain/interfaces/UserRepository";
import { loginUser, logoutUser } from "@/modules/users/infrastructure/api/UserApi";
import { User } from "@/modules/users/domain/entities/user";
import { apiService } from "@/core/auth/infrastructure/api/api.service";

export class UserRepository extends IUserRepository {
  async login({ username, password }) {
    const payload = await loginUser({ username, password });

    // Tolerate both direct payload and wrapped { data }
    const data = payload?.data ?? payload;

    // Cookie-based auth may not return a token
    const accessToken = data?.access_token || data?.accessToken || "";

    let userPayload = data?.user;

    // If login didn’t return the user, fetch it via session cookie
    if (!userPayload) {
      try {
        // Use your actual profile endpoint
        const profileRes = await apiService.get("/api/v1/auth/profile");
        const profileData = profileRes?.data ?? profileRes;
        // Support { user: {...} }, { profile: {...} }, or direct object
        userPayload = profileData?.user ?? profileData?.profile ?? profileData;
      } catch {
        // Will validate below
      }
    }

    if (!userPayload) {
      throw new Error("Login failed: Unable to fetch user profile.");
    }

    const user = new User(userPayload);

    return {
      access_token: accessToken, // may be empty when using httpOnly cookies
      user,
    };
  }

  async logout() {
    const response = await logoutUser();
    // If backend returns { success: boolean }, enforce it; else accept empty body
    if (response && typeof response === "object" && "success" in response && response.success !== true) {
      throw new Error("Logout failed: Invalid response from server.");
    }
  }
}