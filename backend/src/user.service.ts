import { Injectable } from "@nestjs/common";
import { PrismaService } from "./Prisma.service";
import { mst_user, Prisma } from "generated/prisma";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.mst_userCreateInput) {
    return this.prisma.mst_user.create({ data });
  }

  async getUserById(id: string) {
    return this.prisma.mst_user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Prisma.mst_userUpdateInput) {
    return this.prisma.mst_user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.prisma.mst_user.delete({ where: { id } });
  }
}
