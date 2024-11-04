import { Module } from '@nestjs/common';
import { ProductController } from './products.controller.js';
import { ProductService } from './products.service.js';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
