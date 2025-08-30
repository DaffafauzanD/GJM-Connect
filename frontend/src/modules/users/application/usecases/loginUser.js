import { UserRepository } from "@/modules/users/infrastructure/repositories/UserRepository";
import { User } from "@/modules/users/domain/entities/user";

/**
 * @param {UserRepository} userRepository
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ access_token: string, user: User }>}
 */
export async function loginUserUseCase(userRepository, credentials) {
  // Domain logic can be added here, e.g., validation
  if (!credentials.username || !credentials.password) {
    throw new Error("Username and password are required.");
  }
  return await userRepository.login(credentials);
}