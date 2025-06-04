import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsString, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/app/common/data-query/dto/data-query.dto';

class GetSaleSummariesBaseDto {
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

export class GetSaleSummariesDto extends IntersectionType(
  GetSaleSummariesBaseDto,
  PaginationQueryDto,
) {}
