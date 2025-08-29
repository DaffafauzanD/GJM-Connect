import { Module } from "@nestjs/common";
import { RoleController } from "./presentation/role.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { RoleService } from "./application/services/role.service";
import { RoleRepository } from "./infrastructure/repositories/role.repository";

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: 'RoleRepositoryInterface', // <-- use a string token
      useClass: RoleRepository,           // <-- your implementation class
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}