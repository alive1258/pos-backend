import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale_summaries')
export class SaleSummary {
  /**
   * Primary Key ID
   */
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  /**
   * Invoice
   */
  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  @Column({ type: 'varchar', length: 255 })
  customer_phone: string;

  /**
   * Total Quantity
   */
  @Column({ type: 'decimal', precision: 40 })
  total_quantity: number;

  /**
   * Total price
   */
  @Column({ type: 'decimal', precision: 12 })
  total_price: number;

  /**
   * Added by ID
   */
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
