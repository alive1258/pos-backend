import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleSummaryDto } from './dto/create-sale-summary.dto';
import { UpdateSaleSummaryDto } from './dto/update-sale-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleSummary } from './entities/sale-summary.entity';
import { Repository } from 'typeorm';
import { SaleLog } from './entities/sale-log.entity';
import { DataQueryService } from 'src/app/common/data-query/data-query.service';
import { SaleSummariesProvider } from './providers/sale-summaries.provider';
import { Request } from 'express';
import { GetSaleSummariesDto } from './dto/get-sale-summary.dto';
import { IPagination } from 'src/app/common/data-query/pagination.interface';

@Injectable()
export class SaleSummariesService {
  constructor(
    @InjectRepository(SaleSummary)
    private readonly saleSummariesRepository: Repository<SaleSummary>,

    @InjectRepository(SaleLog)
    private readonly saleLogsRepository: Repository<SaleLog>,

    private readonly saleSummariesProvider: SaleSummariesProvider,

    //   private readonly saleReportsProvider: SaleReportsProvider,
    private readonly dataQueryService: DataQueryService,
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

  /**
   * Find all sale summary
   */
  public async findAll(
    getSaleSummariesDto: GetSaleSummariesDto,
  ): Promise<IPagination<SaleSummary>> {
    // define searchableFields
    const searchableFields = ['customer_name', 'customer_phone'];

    // // define relations
    // const relations = ['customer', 'cashbook', 'company', 'branch'];
    const { page, limit, search, ...filters } = getSaleSummariesDto;

    // 4. relations that we want to populate
    const saleSummaries = this.dataQueryService.dataQuery({
      paginationQuery: {
        limit,
        page,
        search,
        filters,
      },
      searchableFields,
      repository: this.saleSummariesRepository,
      // relations,
    });

    return saleSummaries;
  }

  /**
   * Find single sale summary
   */
  public async findOne(
    id: string,
  ): Promise<{ saleSummary: SaleSummary; saleLogs: SaleLog[] }> {
    if (!id) {
      throw new BadRequestException('Sale summary ID is required!');
    }

    // find the single sale summary
    const saleSummary = await this.saleSummariesRepository.findOne({
      where: { id },
    });

    if (!saleSummary) {
      throw new NotFoundException('Sale summary does not found.');
    }
    const saleLogs = await this.saleLogsRepository.find({
      where: { sale_id: saleSummary?.id },
      relations: ['product'],
    });
    return { saleSummary, saleLogs };
  }

  update(id: number, updateSaleSummaryDto: UpdateSaleSummaryDto) {
    return `This action updates a #${id} saleSummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleSummary`;
  }
}
