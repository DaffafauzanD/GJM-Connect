import { LoginRequest, LoginResponse } from '../entities/auth-entity';

export interface AuthServiceInterface {
  login(loginRequest: LoginRequest): Promise<LoginResponse>;
  validateToken(token: string): Promise<any>;
}
