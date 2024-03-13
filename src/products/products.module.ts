import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  providers: [ProductsService],
  controllers: [ProductController]
})
export class ProductsModule {}
