import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './products.entity';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.productService.findOneByName(name);
  }

  @Post()
  create(@Body() product: Product) {
    return this.productService.addProduct(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
