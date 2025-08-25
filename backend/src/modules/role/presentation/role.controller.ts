import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { RoleService } from '../domain/services/role.services.interfaces';
import { RoleDto } from 'src/common/dto/role.dto';
import { PaginationDto } from 'src/common/dto';

@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @Get()
    async findAll(@Query() pagination: PaginationDto) {
        return this.roleService.findAllRoles(pagination);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.roleService.findRoleById(id);
    }

}