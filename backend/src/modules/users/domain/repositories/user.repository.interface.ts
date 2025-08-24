import { User } from '../entities/user.entity';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../../../common/interfaces/api-response.interface';

export interface IUserRepository {
  findAll(pagination: PaginationDto): Promise<PaginatedResponse<User>>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
} 