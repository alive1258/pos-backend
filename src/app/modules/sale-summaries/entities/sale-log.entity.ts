import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { SaleSummary } from './sale-summary.entity';

@Entity('sale_logs')
export class SaleLog {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @ManyToOne(() => SaleSummary, { eager: false })
  @JoinColumn({ name: 'sale_id' })
  sale: SaleSummary;

  @Column({ type: 'bigint' })
  sale_id: string;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'bigint' })
  product_id: string;

  @Column({ type: 'decimal', precision: 40, scale: 5 })
  quantity: number;

  @Column({ type: 'decimal', precision: 40, scale: 5 })
  total_price: number;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'added_by' })
  added_user: User;

  @Column({ type: 'bigint' })
  added_by: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
