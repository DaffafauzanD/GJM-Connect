import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { RoleController } from './modules/role/presentation/role.controller';
import { HealthController } from './modules/health/health.controller';
import { ProdukController } from './modules/produk/presentation/produk.controller';
import { ProdukModule } from './modules/produk/produk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // UsersModule,
    AuthModule,
    RoleModule,
    ProdukModule,
  ],
  controllers: [AppController, HealthController, RoleController, ProdukController],
  providers: [AppService],
})
export class AppModule {}