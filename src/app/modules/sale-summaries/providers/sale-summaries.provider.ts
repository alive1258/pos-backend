import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DataSource } from 'typeorm';
import { Request } from 'express';
import { SaleSummary } from '../entities/sale-summary.entity';
import { SaleLog } from '../entities/sale-log.entity';
import { UsersService } from '../../users/users.service';
import { CreateSaleSummaryDto } from '../dto/create-sale-summary.dto';
import { ProductsService } from '../../products/products.service';

@Injectable()
export class SaleSummariesProvider {
  constructor(
    private readonly dataSource: DataSource, // Inject the data source for transaction management

    private readonly productService: ProductsService,
  ) {}

  async createSaleSummaries(
    req: Request,
    createSaleSummaryDto: CreateSaleSummaryDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    // Establish a transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user_id = req?.user?.sub;

      //  check product list
      if (createSaleSummaryDto?.products?.length < 0) {
        throw new BadRequestException('Product list is empty');
      }

      // check payment balance and total balance

      // check quantity
      const totalQuantity = createSaleSummaryDto?.products?.reduce(
        (sum, product) => sum + product?.quantity,
        0,
      );
      if (totalQuantity !== createSaleSummaryDto?.total_quantity) {
        throw new BadRequestException(
          'Quantity and total quantity do not match',
        );
      }

      const saleSummariesData = {
        total_quantity: createSaleSummaryDto.total_quantity,
        customer_name: createSaleSummaryDto.customer_name,
        customer_phone: createSaleSummaryDto.customer_phone,
        total_price: createSaleSummaryDto.total_price,
        added_by: user_id,
      };

      // Save the sale summary using the transaction manager
      const newSaleSummary = queryRunner.manager.create(
        SaleSummary,
        saleSummariesData,
      );
      const saleSummary = await queryRunner.manager.save(newSaleSummary);

      await Promise.all(
        // create sale log
        createSaleSummaryDto.products.map(async (product) => {
          const product_id = product?.product_id;

          const checkProduct: any =
            await this.productService.findOne(product_id);

          if (!checkProduct) {
            throw new BadRequestException('Product is not available!');
          }

          if (checkProduct?.stock_qty < product?.quantity) {
            throw new BadRequestException('Insufficient stock for product');
          }

          const updatedQuantity = checkProduct.stock_qty - product.quantity;
          await this.productService.update(checkProduct.id, {
            stock_qty: updatedQuantity,
          });
          // product revenue end
          const salesLogData = {
            product_id: product_id,
            quantity: product?.quantity,
            sale_id: saleSummary.id,
            total_price: product?.total_price,
            added_by: user_id,
          };

          const newSaleLog = queryRunner.manager.create(SaleLog, salesLogData);
          await queryRunner.manager.save(newSaleLog);
        }),
      );
      // product operation end

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return the saved sale summary
      return saleSummary;
    } catch (error) {
      console.log(error, 'error');
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();

      // Handle the error
      throw new InternalServerErrorException(
        error?.driverError?.detail ??
          error?.response?.message ??
          'Failed to create sale summary!',
        { description: error },
      );
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
