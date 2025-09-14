import type { User, UserRole, UserPermission } from "../entities/index";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  access_token: string;
  user: User
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    role: string;
    permission?: string[];
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  permission: UserPermission;
  iat: number;
  exp: number;
}
