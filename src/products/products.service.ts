import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductService {
  constructor(private entityManager: EntityManager) {}

  async findAll() {
    return this.entityManager.find(Product);
  }

  async findOneByName(name: string) {
    return this.entityManager.findOne(Product, { where: { name } });
  }

  async addProduct(product: Product) {
    return this.entityManager.save(Product, product);
  }

  async updateProduct(id: string, product: Product) {
    return this.entityManager.update(Product, id, product);
  }

  async delete(id: string) {
    return this.entityManager.delete(Product, id);
  }
}
