import { PaginationDto } from "src/common/dto";
import { Permission } from "../entities/permission.entity";
import { PaginatedResponse } from "src/common/interfaces";
import { PermissionDto } from "../../application/dto/permission.dto";
import { createPermission } from "../../application/dto/create-permission.dto";

export interface PermissionRepositoryInterface {
    findAllPermissions(pagination: PaginationDto): Promise<PaginatedResponse<Permission>>;
    findPermissionById(id: string): Promise<PaginatedResponse<PermissionDto>>;
    createPermission(data: createPermission): Promise<PaginatedResponse<PermissionDto>>;
    updatePermission(id: string, data: createPermission): Promise<PaginatedResponse<PermissionDto>>;
    deletePermission(id: string): Promise<void>;
}
