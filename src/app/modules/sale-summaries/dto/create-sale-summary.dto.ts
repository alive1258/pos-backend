import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// product Dto
class ProductDto {
  /**
   * Product ID
   */
  @ApiProperty({
    description: 'Product ID',
    example: '1',
  })
  @IsString()
  product_id: string;

  /**
   * Quantity
   */

  @ApiProperty({
    description: 'Quantity',
    example: 10,
  })
  @IsNumber()
  quantity: number;

  /**
   * unit_price
   */
  @ApiProperty({
    description: 'unit_price',
    example: 10,
  })
  @IsNumber()
  unit_price: number;

  /**
   * Total Price
   */
  @ApiProperty({
    description: 'Total Price',
    example: 100.0,
  })
  @IsNumber()
  total_price: number;
}

export class CreateSaleSummaryDto {
  /**
   * Customer I
   */
  @ApiProperty({
    description: ' customer_name',
    example: 'mamun',
  })
  @IsOptional()
  @IsString()
  customer_name?: string;
  /**
   * customer_phone
   */
  @ApiProperty({
    description: 'Customer Phone',
    example: '1',
  })
  @IsOptional()
  @IsString()
  customer_phone?: string;

  /**
   * Total Quantity
   */
  @ApiProperty({
    description: 'Total Quantity',
    example: 10.0,
  })
  @IsNumber()
  total_quantity: number;

  /**
   * Total Payment
   */
  @ApiProperty({
    description: 'Total Payment',
    example: 100.0,
  })
  @IsNumber()
  total_payment?: number;

  /**
   * Total Price
   */
  @ApiProperty({
    description: 'Total Price',
    example: 100.0,
  })
  @IsNumber()
  total_price: number;

  /**
   * Invoice (Optional)
   */
  @ApiPropertyOptional({
    description: 'Invoice (Optional)',
    example: 'INV-001',
  })
  @IsOptional()
  @IsString()
  invoice?: string;

  /**
   * Products
   */
  @ApiProperty({
    description: 'List of products for the sale',
    type: [ProductDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
