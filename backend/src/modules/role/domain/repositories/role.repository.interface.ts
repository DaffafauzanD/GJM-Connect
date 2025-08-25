import { PaginationDto } from "src/common/dto";
import { Role } from "../entities/role.entity";
import { PaginatedResponse } from "src/common/interfaces";
    
export interface RoleRepository {
    findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<Role>>;
    createRole(Role: Role): Promise<PaginatedResponse<Role>>;
    findRoleById(id: string): Promise<Role | null>;
    updateRole(id: string, Role: Partial<Role>): Promise<Role | null>;
    deleteRole(id: string): Promise<boolean>;
}
