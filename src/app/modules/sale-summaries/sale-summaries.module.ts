import { Module } from '@nestjs/common';
import { SaleSummariesService } from './sale-summaries.service';
import { SaleSummariesController } from './sale-summaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleSummary } from './entities/sale-summary.entity';
import { SaleLog } from './entities/sale-log.entity';
import { ProductsModule } from '../products/products.module';
import { SaleSummariesProvider } from './providers/sale-summaries.provider';

@Module({
  controllers: [SaleSummariesController],
  providers: [SaleSummariesService, SaleSummariesProvider],
  exports: [SaleSummariesService],
  imports: [TypeOrmModule.forFeature([SaleSummary, SaleLog]), ProductsModule],
})
export class SaleSummariesModule {}
