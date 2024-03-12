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

@Module({
  imports: [UsersModule, DatabaseModule, CategoriesModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, DatabaseService, CategoriesService],
})
export class AppModule {}
