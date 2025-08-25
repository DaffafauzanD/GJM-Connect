import { RoleDto } from "src/common/dto/role.dto";
import { PaginationDto } from "src/common/dto";
import { PaginatedResponse } from "src/common/interfaces/api-response.interface";

export interface RoleService {
    findAllRoles(pagination: PaginationDto): Promise<PaginatedResponse<RoleDto>>;
    findRoleById(id: string): Promise<RoleDto | null>;
    createRole(roleDto: RoleDto): Promise<RoleDto>;
    updateRole(id: string, roleDto: Partial<RoleDto>): Promise<RoleDto | null>;
    deleteRole(id: string): Promise<boolean>;
}