import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
@Index('idx_clients_info', ['name', 'email', 'phone', 'address'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  created_at: Date;

  @Column({ type: 'date' })
  updated_at: Date;
}
