import { IntersectionType } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { PaginationQueryDto } from 'src/app/common/data-query/dto/data-query.dto';

class GetSaleReportsBaseDto {
  @IsString()
  @IsOptional()
  product_ids?: string;

  @IsString()
  @IsOptional()
  customer_name?: string;

  @IsString()
  @IsOptional()
  customer_phone?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetSaleReportsDto extends IntersectionType(
  GetSaleReportsBaseDto,
  PaginationQueryDto,
) {}
