import { IAuthService } from '@/core/domain/services/auth.service.interface';
import { IAuthRepository } from '@/core/domain/repositories/auth.repository.interface';
import { LoginCredentials, RegisterCredentials, AuthResponse, User, LoginResponse } from '@/core/domain/entities';

export class AuthService implements IAuthService {
  constructor(private authRepository: IAuthRepository) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.authRepository.login(credentials);
    return response;
  }

  // async register(credentials: RegisterCredentials): Promise<AuthResponse> {
  //   const response = await this.authRepository.register(credentials);
  //   this.setAccessToken(response.accessToken);
  //   storageUtils.setRefreshToken(response.refreshToken);
  //   return response;
  // }

  async logout(): Promise<void> {
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

   async isAuthenticated(): Promise<boolean> {
    try {
       const response = await this.authRepository.authMe();
       return !!response;
    } catch {
      return false;
    }
  }
}