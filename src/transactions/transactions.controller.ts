import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IsNumberString, IsString } from 'class-validator';
import { FilesInterceptor } from '@nestjs/platform-express';

import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction';
import { PatchTransactionDto } from './dto/patch-transaction';

class Params {
  @IsNumberString()
  id: number;
}

// tslint:disable-next-line:max-classes-per-file
class ParamsCreateMany {
  @IsString()
  format: string;
}

// tslint:disable-next-line:max-classes-per-file
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService ) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: Params): Promise<Transaction> {
    return await this.transactionsService.findOne(+params.id);
  }
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post('batch')
  createMany(@Body() createTransactionsDto: CreateTransactionDto[]) {
    return this.transactionsService.createMany(createTransactionsDto);
  }

  @Post('batch/xlxs')
  @UseInterceptors(FilesInterceptor('upload'))
  async createManyExcel(@UploadedFiles() upload, @Query() params: ParamsCreateMany) {
    return this.transactionsService.createManyExcel(upload[0].buffer, params.format);
  }

  @Post('batch/csv')
  @UseInterceptors(FilesInterceptor('upload'))
  async createManyCsv(@UploadedFiles() upload, @Query() params: ParamsCreateMany) {
    return this.transactionsService.createManyCsv(upload[0].buffer, params.format);
  }

  @Delete(':id')
  delete(@Param() params: Params) {
    return this.transactionsService.delete(+params.id);
  }

  @Put(':id')
  update(@Body() createEventDto: CreateTransactionDto, @Param() params: Params) {
    return this.transactionsService.update(+params.id, createEventDto);
  }

  @Patch(':id')
  patch(@Body() patchTransactionDto: PatchTransactionDto, @Param() params: Params) {
    return this.transactionsService.patch(+params.id, patchTransactionDto);
  }
}
