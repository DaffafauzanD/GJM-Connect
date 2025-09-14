import { LoginCredentials, RegisterCredentials, AuthResponse } from '../entities/auth.entity';
import { User } from '../entities/user.entity';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  // register(credentials: RegisterCredentials): Promise<AuthResponse>;
  // refreshToken(): Promise<AuthResponse>;
  isAuthenticated(): Promise<boolean>;
}
