import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    CategoriesModule,
    ProductsModule,
    CartModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    DatabaseService,
    CategoriesService,
    ProductsService,
    CartService,
    AuthService,
    JwtService,
    { provide: APP_GUARD, useClass: AtGuard },
  ],
})
export class AppModule {}
