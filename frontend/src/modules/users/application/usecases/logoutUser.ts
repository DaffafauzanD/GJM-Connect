import { UserRepository } from "@/modules/users/infrastructure/repositories/UserRepository";

/**
 * @param {UserRepository} userRepository
 * @returns {Promise<void>}
 */
export async function logoutUserUseCase(userRepository) {
  await userRepository.logout();
}