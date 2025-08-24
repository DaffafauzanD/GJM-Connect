import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { mst_user } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<mst_user> {
    return this.prisma.mst_user.create({ data });
  }

  async findById(id: string): Promise<mst_user | null> {
    return this.prisma.mst_user.findUnique({ where: { id } });
  }

 async findByUsername(username: string) {
  return this.prisma.mst_user.findFirst({ where: { username } });
}

  async update(id: string, data: UpdateUserDto): Promise<mst_user> {
    return this.prisma.mst_user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<mst_user> {
    return this.prisma.mst_user.delete({ where: { id } });
  }
}