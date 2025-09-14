import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../application/services/role.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { RoleDto } from 'src/modules/role/application/dto/role.dto';
import { PaginationDto } from 'src/common/dto';
import { CreateRoleDto } from '../application/dto/create-role.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this.roleService.findAllRoles(pagination);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.roleService.findRoleById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConflictResponse({
  description: 'Role already exists or validation error',
  schema: {
    example: {
      success: false,
      message: 'Role already exists',
      errors: ["Duplicate role name"],
      timestamp: '2025-08-25T10:27:34.302Z',
      path: '/api/v1/roles',
    },
  },
})
  async create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() roleDto: Partial<RoleDto>) {
    return this.roleService.updateRole(id, roleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
