import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@Index('idx_products_name', ['name'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column({ type: 'date', nullable: true })
  created_at?: Date;

  @Column({ type: 'date' })
  updated_at: Date;
}
