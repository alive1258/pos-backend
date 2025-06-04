import { Injectable } from '@nestjs/common';
import { CreateSaleSummaryDto } from './dto/create-sale-summary.dto';
import { UpdateSaleSummaryDto } from './dto/update-sale-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleSummary } from './entities/sale-summary.entity';
import { Repository } from 'typeorm';
import { SaleLog } from './entities/sale-log.entity';
import { DataQueryService } from 'src/app/common/data-query/data-query.service';
import { SaleSummariesProvider } from './providers/sale-summaries.provider';
import { Request } from 'express';

@Injectable()
export class SaleSummariesService {
  constructor(
    private readonly saleSummariesProvider: SaleSummariesProvider,
    //   private readonly saleReportsProvider: SaleReportsProvider,
  ) {}
  /**
   * Create sale summary
   */
  async create(req: Request, createSaleSummaryDto: CreateSaleSummaryDto) {
    return await this.saleSummariesProvider.createSaleSummaries(
      req,
      createSaleSummaryDto,
    );
  }

  findAll() {
    return `This action returns all saleSummaries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleSummary`;
  }

  update(id: number, updateSaleSummaryDto: UpdateSaleSummaryDto) {
    return `This action updates a #${id} saleSummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleSummary`;
  }
}
