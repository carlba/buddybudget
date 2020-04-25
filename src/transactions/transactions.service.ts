import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';
import * as XLSX from 'xlsx';

import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction';
import { PatchTransactionDto } from './dto/patch-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    try {
      return await this.transactionRepository.findOneOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e);
      }
    }
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionRepository.save(createTransactionDto);
  }

  async createMany(createTransactionsDto: CreateTransactionDto[]): Promise<Transaction[]> {
    return await this.transactionRepository.save(createTransactionsDto);
  }

  async createManyExcel(buffer: Buffer, format: string) {
    const workBook = XLSX.read(buffer, {cellDates: true});
    let json: any;
    let workSheet: XLSX.WorkSheet;
    let formatted: CreateTransactionDto[] = [];
    /* tslint:disable:no-string-literal */
    if (format === 'skandia') {
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

    if (format === 'norwegian') {
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
    return this.createMany(formatted);
  }

  async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
    return;
  }

  async update(id: number, createEventDto: CreateTransactionDto) {
    const event = this.transactionRepository.create({...createEventDto, id});
    return await this.transactionRepository.save(event);
  }

  async patch(id: number, patchTransactionDto: PatchTransactionDto) {
    const event = this.transactionRepository.create({...patchTransactionDto, id});
    return await this.transactionRepository.save(event);
  }
}
