import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Client } from './clients.entity';

@Injectable()
export class ClientsService {
  constructor(private readonly entityManager: EntityManager) {}

  async addClient(client: Client) {
    const clientData = client;

    try {
      await this.entityManager.query('CALL add_client($1, $2, $3, $4)', [
        clientData.name,
        clientData.email,
        clientData.phone,
        clientData.address,
      ]);
    } catch (error: any) {
      if (error?.query?.includes('CALL add_client')) {
        return await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            // Validações
            if (!clientData.name || !clientData.email) {
              throw new Error('Name and email are required');
            }

            // Inserir o cliente
            const client = transactionalEntityManager.create(
              Client,
              clientData,
            );

            await transactionalEntityManager.save(Client, client);
            return client;
          },
        );
      }

      throw error;
    }
  }

  async findAll() {
    return this.entityManager.find(Client);
  }

  async findOneByName(name: string) {
    return this.entityManager.findOne(Client, { where: { name } });
  }

  async findOneByEmail(email: string) {
    return this.entityManager.findOne(Client, { where: { email } });
  }

  async updateClient(id: string, updateData: Partial<Client>) {
    return this.entityManager.update(Client, id, updateData);
  }

  async delete(id: string) {
    return this.entityManager.delete(Client, id);
  }
}
