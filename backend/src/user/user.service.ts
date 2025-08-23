import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mst_user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<mst_user> {
    return this.userRepository.create(data);
  }

  async getUserById(id: string): Promise<mst_user | null> {
    return this.userRepository.findById(id);
  }

  async findByUsername(username: string) {
  return this.userRepository.findByUsername(username);
}

  async updateUser(id: string, data: UpdateUserDto): Promise<mst_user> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<mst_user> {
    return this.userRepository.delete(id);
  }
}