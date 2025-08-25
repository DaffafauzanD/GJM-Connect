import { IAuthRepository } from '@/core/domain/repositories/auth.repository.interface';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/core/domain/entities';
import { apiService } from '@/core/infrastructure/api/api.service';
import { API_ENDPOINTS, API_CONFIG } from '@/core/infrastructure/api/api.config';

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    console.log(response);
    return response.data!;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
    return response.data!;
  }

  async logout(): Promise<void> {
    await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
    return response.data!;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.AUTH.ME);
    return response.data!;
  }

  async forgotPassword(email: string): Promise<void> {
    await apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  }
}