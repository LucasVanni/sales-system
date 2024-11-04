import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../../src/clients/clients.entity';
import { ClientsService } from '../../src/clients/clients.service';
import clientsData from '../utils/clients.json';

describe('ClientsService', () => {
  let service: ClientsService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Client],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Client]),
      ],
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all clients', async () => {
    const result = [{ id: 1, name: 'John Doe' }];
    jest.spyOn(entityManager, 'find').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should find one client by name', async () => {
    const result = { id: 1, name: 'John Doe' };
    jest.spyOn(entityManager, 'findOne').mockResolvedValue(result);

    expect(await service.findOneByName('John Doe')).toBe(result);
  });

  it('should create a client', async () => {
    const clientData = {
      ...clientsData,
      id: uuidv4(),
      updated_at: new Date(),
      created_at: new Date(),
    };

    jest.spyOn(entityManager, 'save').mockResolvedValue(clientData);

    expect(await service.addClient(clientData)).toEqual(clientData);
  });

  it('should update a client', async () => {
    const client = {
      ...clientsData,
      updated_at: new Date(),
      created_at: new Date(),
    };

    jest
      .spyOn(entityManager, 'update')
      .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

    expect(await service.updateClient(client.id, client)).toStrictEqual({
      affected: 1,
      raw: {},
      generatedMaps: [],
    });
  });

  it('should delete a client', async () => {
    const client = {
      ...clientsData,
      updated_at: new Date(),
      created_at: new Date(),
    };

    jest
      .spyOn(entityManager, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} });

    expect(await service.delete(client.id)).toStrictEqual({
      affected: 1,
      raw: {},
    });
  });
});
