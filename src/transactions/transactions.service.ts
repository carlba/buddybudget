import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction';

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

  async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
    return;
  }

  async update(id: number, createEventDto: CreateTransactionDto) {
    const event = this.transactionRepository.create({...createEventDto, id});
    return await this.transactionRepository.save(event);
  }
}
