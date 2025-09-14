import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../entities';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  authMe(): Promise<any>;
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
}
