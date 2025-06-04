import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/**
 * DTO for creating a fashion shop product.
 * Includes name, code, price, stock, category, sizes, colors, etc.
 */
export class CreateProductDto {
  @ApiProperty({
    description: 'Product name displayed in the shop.',
    example: 'Slim Fit T-Shirt',
  })
  @IsString()
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string;

  @ApiProperty({
    description: 'Unique product code (SKU) for inventory tracking.',
    example: 'TSHIRT-001-BLK-M',
  })
  @IsString()
  @IsNotEmpty({ message: 'Product code is required.' })
  code: string;

  @ApiProperty({
    description: 'Retail price of the product.',
    example: 1299.99,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number.' },
  )
  @IsPositive({ message: 'Price must be greater than zero.' })
  price: number;

  @ApiProperty({
    description: 'Number of units available in stock.',
    example: 100,
  })
  @IsNumber({}, { message: 'Stock quantity must be a number.' })
  @IsPositive({ message: 'Stock quantity must be positive.' })
  stock_qty: number;
}
