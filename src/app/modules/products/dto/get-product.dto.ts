import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/app/common/data-query/dto/data-query.dto';

/**
 * Base DTO for filtering the "About Me" section.
 */
class GetProductBaseDto {
  @ApiPropertyOptional({
    description: 'Filter products by name or keyword.',
    example: 'Slim Fit T-Shirt',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by product code (SKU).',
    example: 'TSHIRT-001-BLK-M',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: ' price filter.',
    example: 500,
  })
  @IsOptional()
  @IsNumber({}, { message: ' price must be a number.' })
  price?: number;

  @ApiPropertyOptional({
    description: ' stock quantity filter.',
    example: 100,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Stock quantity must be a number.' })
  stock_qty?: number;
}

/**
 * DTO for retrieving "About Me" entries with optional filters and pagination.
 */
export class GetProductDto extends IntersectionType(
  GetProductBaseDto,
  PaginationQueryDto,
) {}
