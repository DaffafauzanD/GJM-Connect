import { User } from '../../../users/domain/entities/user.entity';

export interface AuthRepositoryInterface {
  findByUsername(username: string): Promise<User | null>;
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}
