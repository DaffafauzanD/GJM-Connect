import { IAuthService } from '@/core/domain/services/auth.service.interface';
import { IAuthRepository } from '@/core/domain/repositories/auth.repository.interface';
import { LoginCredentials, RegisterCredentials, AuthResponse, User, LoginResponse } from '@/core/domain/entities';
import { storageUtils } from '@/shared/utils/storage.utils';

export class AuthService implements IAuthService {
  private accessToken: string;
  constructor(private authRepository: IAuthRepository) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.authRepository.login(credentials);
    this.accessToken = response.access_token;
    console.log(this.accessToken = response.access_token);
    this.setAccessToken(response.access_token);
    return response;
  }

  // async register(credentials: RegisterCredentials): Promise<AuthResponse> {
  //   const response = await this.authRepository.register(credentials);
  //   this.setAccessToken(response.accessToken);
  //   storageUtils.setRefreshToken(response.refreshToken);
  //   return response;
  // }

  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
    } finally {
      this.removeAccessToken();
      storageUtils.clearTokens();
    }
  }

  // async refreshToken(): Promise<AuthResponse> {
  //   const refreshToken = storageUtils.getRefreshToken();
  //   if (!refreshToken) {
  //     throw new Error('No refresh token available');
  //   }

  //   const response = await this.authRepository.refreshToken(refreshToken);
  //   this.setAccessToken(response.accessToken);
  //   storageUtils.setRefreshToken(response.refreshToken);
  //   return response;
  // }

  async getCurrentUser(): Promise<User> {
    return await this.authRepository.getCurrentUser();
  }

  isAuthenticated(): boolean {
    const token = storageUtils.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getAccessToken(): string | null {
    return storageUtils.getAccessToken();
  }

  setAccessToken(token: string): void {
    storageUtils.setAccessToken(token);
  }

  removeAccessToken(): void {
    storageUtils.removeAccessToken();
  }
}