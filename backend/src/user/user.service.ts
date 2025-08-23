import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { mst_user } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<mst_user> {
    return this.prisma.mst_user.create({ data });
  }

  async getUserById(id: string): Promise<mst_user | null> {
    return this.prisma.mst_user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<mst_user> {
    return this.prisma.mst_user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<mst_user> {
    return this.prisma.mst_user.delete({ where: { id } });
  }
}