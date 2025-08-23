import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { mst_role, Prisma } from "@prisma/client";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: Prisma.mst_roleCreateInput) {
    return this.prisma.mst_role.create({ data });
  }

  async getRoleById(id: string) {
    return this.prisma.mst_role.findUnique({ where: { id } });
  }

  async updateRole(id: string, data: Prisma.mst_roleUpdateInput) {
    return this.prisma.mst_role.update({ where: { id }, data });
  }

  async deleteRole(id: string) {
    return this.prisma.mst_role.delete({ where: { id } });
  }
}
