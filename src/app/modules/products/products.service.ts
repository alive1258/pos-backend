import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataQueryService } from 'src/app/common/data-query/data-query.service';
import { Request } from 'express';
import { GetProductDto } from './dto/get-product.dto';
import { IPagination } from 'src/app/common/data-query/pagination.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataQueryService: DataQueryService,
  ) {}

  public async create(
    req: Request,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const user_id = req?.user?.sub;
    // 1. Check if user is authenticated
    if (!user_id) {
      throw new UnauthorizedException(
        'You must be signed in to access this resource.',
      );
    }
    // 2. Check for duplicate record
    const existingData = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });
    if (existingData) {
      throw new BadRequestException(
        'A record with the same data already exists.',
      );
    }

    // 3. Create and save the new entry
    const newEntry = this.productRepository.create({
      ...createProductDto,
      added_by: user_id,
    });
    return this.productRepository.save(newEntry);
  }

  // ✅ Public GET endpoint with pagination and search support

  public async findAll(
    getProductDto: GetProductDto,
  ): Promise<IPagination<Product>> {
    // Fields that can be searched by keyword
    const searchableFields = ['name', 'code'];

    // Extract pagination and search params
    const { limit, page, search, ...filters } = getProductDto;

    // Query database using DataQueryService abstraction
    const product = this.dataQueryService.dataQuery({
      paginationQuery: { limit, page, search, filters },
      searchableFields,
      repository: this.productRepository,
    });
    // check if collaborate is empty
    if (!product) {
      throw new BadRequestException('No product  data found');
    }
    return product;
  }

  // ✅ Public GET endpoint to retrieve a single Product entry by ID
  public async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new BadRequestException(' No Product data found');
    }
    return product;
  }

  // ✅ Public PATCH endpoint to update a Product entry by ID
  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // 1. Validate that the ID parameter is provided
    if (!id) {
      throw new BadRequestException('Product Id is required');
    }

    // 2. Find the existing product entity by ID
    const product = await this.productRepository.findOneBy({ id });

    // 3. If no record is found, throw an error indicating the resource does not exist
    if (!product) {
      throw new BadRequestException('No product data found');
    }

    // 4. Merge updated fields into the existing entity
    Object.assign(product, updateProductDto);

    // 5. Save and return the updated entity
    return this.productRepository.save(product);
  }

  // ✅ Public DELETE endpoint to remove a Product entry by ID
  public async remove(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException('Product ID is required');
    }

    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return { message: 'Product deleted successfully' };
  }
}
