import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Product } from '../../src/products/products.entity';
import { ProductService } from '../../src/products/products.service';
import productData from '../utils/products.json';

describe('ProductService', () => {
  let service: ProductService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Product],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should find all products', async () => {
    const result = [{ id: 1, name: 'Produto 1' }];
    jest.spyOn(entityManager, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should find one product by name', async () => {
    const result = [{ id: 1, name: 'Produto 1' }];
    jest.spyOn(entityManager, 'findOne').mockResolvedValue(result);

    expect(await service.findOneByName('Produto 1')).toBe(result);
  });

  it('should create a product', async () => {
    const product = {
      ...productData,
      updated_at: new Date(),
      created_at: new Date(),
    };
    jest.spyOn(entityManager, 'save').mockResolvedValue(product);

    expect(await service.addProduct(product)).toBe(product);
  });

  it('should update a product', async () => {
    const product = {
      ...productData,
      updated_at: new Date(),
      created_at: new Date(),
    };

    jest
      .spyOn(entityManager, 'update')
      .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

    expect(await service.updateProduct(product.id, product)).toStrictEqual({
      affected: 1,
      raw: {},
      generatedMaps: [],
    });
  });

  it('should delete a product', async () => {
    const product = {
      ...productData,
      updated_at: new Date(),
      created_at: new Date(),
    };

    jest
      .spyOn(entityManager, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} });

    if (product.id) {
      expect(await service.delete(product.id)).toStrictEqual({
        affected: 1,
        raw: {},
      });
    }
  });
});
