import { Module } from "@nestjs/common";
import { ProdukController } from "./presentation/produk.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProdukService } from "./application/services/produk.service";
import { ProdukRepository } from "./infrastructure/repositories/produk.repository";

@Module({
  imports: [PrismaModule],
  controllers: [ProdukController],
  providers: [
    ProdukService,
    {
      provide: 'ProdukRepositoryInterface',
      useClass: ProdukRepository,
    },
  ],
    exports: [ProdukService],
})
export class ProdukModule {}
    