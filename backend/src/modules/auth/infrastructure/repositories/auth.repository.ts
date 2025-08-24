import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AuthRepositoryInterface } from '../../domain/repositories/auth-repositories.interface';
import { User } from '../../../users/domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.mst_user.findUnique({
      where: { username },
      include: {
        mst_role: true,
      },
    });

    if (!user) {
      return null;
    }

    return new User({
      id: user.id,
      username: user.username,
      password: user.password,
      id_role: user.id_role,
      create_date: user.create_date,
      update_date: user.update_date,
      create_by: user.create_by,
      update_by: user.update_by,
    });
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
} 