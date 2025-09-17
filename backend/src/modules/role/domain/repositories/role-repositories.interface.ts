import { PaginationDto } from "src/common/dto";
import { PaginatedResponse } from "src/common/interfaces";
import { CreateRoleDto } from "../../application/dto/create-role.dto";
import { Role } from "../entities/role.entity";

export interface RoleRepositoryInterface {
  findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<Role>>;
  findRoleById(id: string): Promise<Role | null>;
  findRoleByName(name: string): Promise<Role | null>;
  createRole(role: CreateRoleDto): Promise<Role>;
  updateRole(id: string, role: Partial<Role>): Promise<Role | null>;
  deleteRole(id: string): Promise<boolean>;
}