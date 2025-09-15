import { PaginationDto } from "src/common/dto";
import { PaginatedResponse } from "src/common/interfaces";
import { CreateRoleDto } from "../../application/dto/create-role.dto";
import { RoleDto } from "src/modules/role/application/dto/role.dto";

export interface RoleServiceInterface {
  findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<RoleDto>>;
  findRoleById(id: string): Promise<RoleDto | null>;
  findRoleByName(name: string): Promise<RoleDto | null>;
  createRole(role: CreateRoleDto): Promise<RoleDto>;
  updateRole(id: string, role: Partial<RoleDto>): Promise<RoleDto | null>;
  deleteRole(id: string): Promise<boolean>;
}