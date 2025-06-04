import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGuard } from 'src/app/auth/guards/authentication.guard';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { GetProductDto } from './dto/get-product.dto';
import { IpDeviceThrottlerGuard } from 'src/app/auth/decorators/ip-device-throttler-guard';
import { Throttle } from '@nestjs/throttler';

/**
 * Controller for managing product operations.
 */
@ApiTags('Products') // Organizes Swagger under "Products" section
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Protected route for creating a new product.
   * Requires valid authentication.
   */
  @UseGuards(AuthenticationGuard, IpDeviceThrottlerGuard)
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'Adds a new product to the fashion shop database. Requires authentication.',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Valid token required.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req, createProductDto);
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of records per page (pagination)',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description: 'Search keyword for filtering results by name or code',
    example: 'First',
  })
  @ApiOperation({
    summary: 'Retrieve all product with pagination and search support',
  })
  @ApiResponse({
    status: 200,
    description: 'List of product entries fetched successfully',
  })
  findAll(@Query() getProductDto: GetProductDto) {
    return this.productsService.findAll(getProductDto);
  }

  // ✅ Public GET endpoint to retrieve by ID
  @UseGuards(AuthenticationGuard) // ✅ Protects the endpoint using custom auth guard
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Unique identifier for the product entry',
    example: '4',
  })
  @ApiOperation({
    summary: 'Retrieve a single product entry by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the entry',
  })
  @ApiResponse({
    status: 404,
    description: 'Entry not found with the given ID',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // ✅ Protected PATCH endpoint for updating by ID
  @UseGuards(AuthenticationGuard) // ✅ Protects the endpoint using custom auth guard
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Unique ID of the Product to be updated',
    example: '4',
  })
  @ApiOperation({
    summary: 'Update a specific Product entry by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the Product entry',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format or invalid update payload',
  })
  @ApiResponse({
    status: 404,
    description: 'No Product found with the provided ID',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // ✅ Protected DELETE endpoint for removing by ID
  @UseGuards(AuthenticationGuard) // ✅ Protects the endpoint using custom auth guard
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID of the Product entry to delete',
    example: '4',
  })
  @ApiOperation({
    summary: 'Delete a Product entry by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the Product entry',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'No Product found with the provided ID',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
