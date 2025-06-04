import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Product entity representing items in the fashion shop.
 */
@Entity({ name: 'products' })
export class Product {
  /**
   * Primary key ID (auto-incremented bigint).
   */
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  /**
   * Name of the product (e.g., "Slim Fit T-Shirt").
   */
  @Column({ type: 'varchar', length: 255 })
  name: string;

  /**
   * Unique product code or SKU for inventory tracking.
   */
  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  /**
   * Product price in decimal format.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Available stock quantity.
   */
  @Column({ type: 'int', nullable: false })
  stock_qty: number;

  /**
   * ID of the user who added this product (foreign key reference).
   */
  @Column({ type: 'bigint' })
  added_by: string;

  /**
   * Timestamp when the product was first created.
   * Automatically set by TypeORM.
   */
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  /**
   * Timestamp when the product was last updated.
   * Automatically set by TypeORM.
   */
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
