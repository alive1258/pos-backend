import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SaleSummariesService } from './sale-summaries.service';
import { CreateSaleSummaryDto } from './dto/create-sale-summary.dto';
import { UpdateSaleSummaryDto } from './dto/update-sale-summary.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenticationGuard } from 'src/app/auth/guards/authentication.guard';
import { GetSaleSummariesDto } from './dto/get-sale-summary.dto';

@Controller('sale-summaries')
export class SaleSummariesController {
  constructor(private readonly saleSummariesService: SaleSummariesService) {}
  /**
   * Create sale summary controller
   */
  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Data created successfully.',
  })
  create(
    @Req() req: Request,
    @Body() createSaleSummaryDto: CreateSaleSummaryDto,
  ) {
    return this.saleSummariesService.create(req, createSaleSummaryDto);
  }

  /**
   * Get all sale summary controller
   */
  @UseGuards(AuthenticationGuard)
  @Get()
  @ApiQuery({
    name: 'limit',
    type: 'string',
    required: false,
    description: 'The number of entries returned per query',
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: false,
    description: 'The page that wanted.',
    example: '1',
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    description: 'Search anything that you want.',
    example: 'First',
  })
  @ApiOperation({
    summary: 'Get all the data.',
  })
  findAll(@Query() getSaleSummariesDto: GetSaleSummariesDto) {
    return this.saleSummariesService.findAll(getSaleSummariesDto);
  }

  /**
   * Get single sale summary controller
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The params is required to get single data',
    example: '1',
  })
  @ApiOperation({
    summary: 'Get single data.',
  })
  findOne(@Param('id') id: string) {
    return this.saleSummariesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleSummaryDto: UpdateSaleSummaryDto,
  ) {
    return this.saleSummariesService.update(+id, updateSaleSummaryDto);
  }

  /**
   * Delete single sale summary controller
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The params is required for delete',
    example: '4',
  })
  @ApiOperation({
    summary: 'Delete single data.',
  })
  remove(@Param('id') id: string) {
    return this.saleSummariesService.remove(+id);
  }
}
