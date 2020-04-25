import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../../../src/transactions/transaction.entity';

@Injectable({providedIn: 'root'})
export class TransactionsService {

  private TRANSACTIONS_URL = `${this.backendUrl}/transactions`;

  constructor(
    private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string
  ) {}

  add(transaction: Transaction) {
    return this.http.post<Transaction>(this.TRANSACTIONS_URL, transaction);
  }

  getAll() {
    return this.http.get<Transaction[]>(this.TRANSACTIONS_URL);
  }

  get(id: number) {
    return this.http.get<Transaction>(`${this.TRANSACTIONS_URL}/${id}`);
  }

  update(id: number, transaction: Transaction) {
    return this.http.put<Transaction>(`${this.TRANSACTIONS_URL}/${id}`, transaction);
  }

  delete(id: number) {
    return this.http.delete(`${this.TRANSACTIONS_URL}/${id}`);
  }

  patch(id: number, transaction: Transaction) {
    return this.http.patch<Transaction>(`${this.TRANSACTIONS_URL}/${id}`, transaction);
  }

}
