import { LoginCredentials, RegisterCredentials, AuthResponse } from '../entities/auth.entity';
import { User } from '../entities/user.entity';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  // register(credentials: RegisterCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  // refreshToken(): Promise<AuthResponse>;
  getCurrentUser(): Promise<User>;
  isAuthenticated(): boolean;
  getAccessToken(token: string): string | null;
  setAccessToken(token: string): void;
  removeAccessToken(): void;
}
