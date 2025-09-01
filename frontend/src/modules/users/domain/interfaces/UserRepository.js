export class UserRepository {
  /**
   * @param {{ username: string, password: string }} credentials
   * @returns {Promise<{ access_token: string, user: import("../entities/user").User }>}
   */
  async login(credentials) {
    throw new Error("Not implemented");
  }

  async logout() {
    throw new Error("Not implemented");
  }
}