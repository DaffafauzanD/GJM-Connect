import { Injectable, Inject, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RoleServiceInterface } from '../../domain/services/role-services.interfaces';
import { RoleRepositoryInterface } from '../../domain/repositories/role-repositories.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/api-response.interface';
import { RoleDto } from '../dto/role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleService implements RoleServiceInterface {
  constructor(
    @Inject('RoleRepositoryInterface') // <-- use the same token
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async findAllRoles(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<RoleDto>> {
    return this.roleRepository.findAllRoles(pagination);
  }
  async findRoleById(id: string): Promise<RoleDto | null> {
    return this.roleRepository.findRoleById(id);
  }

  async findRoleByName(name: string): Promise<RoleDto | null> {
    return this.roleRepository.findRoleByName(name);
  }

  async createRole(role: CreateRoleDto): Promise<RoleDto> {
    const existingRole = await this.roleRepository.findRoleByName(role.nama);
    if (existingRole) {
      throw new ConflictException({
        message: 'Role already exists',
        errors: ['Duplicate role name'],
      });
    }

    return this.roleRepository.createRole(role);
  }
  async updateRole(
    id: string,
    role: Partial<RoleDto>,
  ): Promise<RoleDto | null> {
    return this.roleRepository.updateRole(id, role);
  }
  async deleteRole(id: string): Promise<boolean> {
    return this.roleRepository.deleteRole(id);
  }
}
