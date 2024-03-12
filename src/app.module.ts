import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController, UsersController, DatabaseController],
  providers: [AppService, UsersService, DatabaseService],
})
export class AppModule {}
