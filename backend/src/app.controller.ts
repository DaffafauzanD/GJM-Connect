import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { mst_user as UserModel, Prisma } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() userData: Prisma.mst_userCreateInput): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() userData: Prisma.mst_userUpdateInput): Promise<UserModel | null> {
    return this.userService.updateUser(id, userData);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.deleteUser(id);
  }
}
