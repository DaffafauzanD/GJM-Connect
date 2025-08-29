import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// Make sure RoleRepositoryInterface is exported in the target file, or import the correct member
import { RoleRepositoryInterface } from "../../domain/repositories/role-repositories.interface";
import { PaginationDto } from "src/common/dto";
import { PaginatedResponse } from "src/common/interfaces";
import { Role } from "../../domain/entities/role.entity";
import { CreateRoleDto } from "../../application/dto/create-role.dto";
import { RoleDto } from "../../application/dto/role.dto";

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}

    async findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<Role>> {
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        const [roles, total] = await Promise.all([
            this.prisma.mst_role.findMany({
                skip,
                take: limit,
                orderBy: { create_by: "desc" },
            }),
            this.prisma.mst_role.count(),
        ]);

        return {
            data: roles as Role[],
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async createRole(role: CreateRoleDto): Promise<RoleDto> {
        const createdRole = await this.prisma.mst_role.create({
            data: {
                ...role,
            },
        });
        return createdRole as RoleDto;
    }

    async findRoleById(id: string): Promise<Role | null> {
        return this.prisma.mst_role.findUnique({
            where: { id },
        }) as Promise<Role | null>;
    }

    async updateRole(id: string, role: Partial<Role>): Promise<Role | null> {
        return this.prisma.mst_role.update({
            where: { id },
            data: role,
        }) as Promise<Role | null>;
    }

    async deleteRole(id: string): Promise<boolean> {
        try {
            await this.prisma.mst_role.delete({
                where: { id },
            });
            return true;
        } catch {
            return false;
        }
    }

    async findRoleByName(nama: string): Promise<Role | null> {
        return this.prisma.mst_role.findUnique({
            where: { nama: nama },
        }) as Promise<Role | null>;
    }
}