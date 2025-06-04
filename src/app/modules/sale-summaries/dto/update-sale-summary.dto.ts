import { PartialType } from '@nestjs/swagger';
import { CreateSaleSummaryDto } from './create-sale-summary.dto';

export class UpdateSaleSummaryDto extends PartialType(CreateSaleSummaryDto) {}
