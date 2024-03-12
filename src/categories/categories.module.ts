import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
