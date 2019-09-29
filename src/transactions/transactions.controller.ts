import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IsNumberString } from 'class-validator';

import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction';

export class Params {
  @IsNumberString()
  id: number;
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
  create(@Body() createEventDto: CreateTransactionDto) {
    return this.transactionsService.create(createEventDto);
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
