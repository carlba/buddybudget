import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { IsNumberString, IsString } from 'class-validator';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction';

class Params {
  @IsNumberString()
  id: number;
}

class ParamsCreateMany {
  @IsString()
  format: string;
}

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
    const workBook = XLSX.read(upload[0].buffer, {cellDates: true});
    let json: any;
    let workSheet: XLSX.WorkSheet;
    let formatted: CreateTransactionDto[] = [];
    /* tslint:disable:no-string-literal */
    if (params.format === 'skandia') {
      workSheet = workBook.Sheets.Kontoutdrag;
      json = XLSX.utils.sheet_to_json(workSheet);

      formatted = json.map((row => {
        return {
          name: row['Beskrivning'],
          date: row['Bokf. datum'],
          amount: row['Belopp']
        };
      }));
    }

    if (params.format === 'norwegian') {
      workSheet = workBook.Sheets.transactions;
      json = XLSX.utils.sheet_to_json(workSheet);
      formatted = json.map((row => {
        return {
          name: row['Text'],
          date: new Date(row['TransactionDate']).toISOString(),
          amount: row['Amount']
        };
      }));
    }
    return this.transactionsService.createMany(formatted);
  }

  @Delete(':id')
  delete(@Param() params: Params) {
    return this.transactionsService.delete(+params.id);
  }

  @Put(':id')
  update(@Body() createEventDto: CreateTransactionDto, @Param() params: Params) {
    return this.transactionsService.update(+params.id, createEventDto);
  }
}
