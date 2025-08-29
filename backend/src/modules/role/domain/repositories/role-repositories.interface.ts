import { PaginationDto } from "src/common/dto";
import { Role } from "../entities/role.entity";
import { PaginatedResponse } from "src/common/interfaces";
import { CreateRoleDto } from "../../application/dto/create-role.dto";
import { RoleDto } from "../../application/dto/role.dto";
    
export interface RoleRepositoryInterface {
    findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<Role>>;
    createRole(Role: CreateRoleDto): Promise<PaginatedResponse<RoleDto>>;
    findRoleById(id: string): Promise<Role | null>;
    updateRole(id: string, Role: Partial<Role>): Promise<Role | null>;
    deleteRole(id: string): Promise<boolean>;
    findRoleByName(name: string): Promise<Role | null>;
}
