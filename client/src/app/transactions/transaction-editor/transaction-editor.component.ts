import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TransactionsService } from '../transactions.service';
import { filter, map } from 'rxjs/operators';
import { Transaction } from '../../../../../src/transactions/transaction.entity';
import IMask from 'imask';

@Component({
  selector: 'app-event-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss']
})
export class TransactionEditorComponent implements OnInit {
  form = this.fb.group({
    name: [null, [Validators.required]],
    description: [null],
    amount: [null],
    date: [null]
  });
  public editing = false;
  public entityName = 'transaction';
  private transactionId: string;
  public numberMask = IMask.MaskedNumber;

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      filter((paramMap: ParamMap) => paramMap.has('transactionId')),
      map((paramMap: ParamMap) => paramMap.get('transactionId'))
    ).subscribe((transactionId: string) => {
      this.transactionId = transactionId;
      this.editing = true;
      this.transactionsService.get(+this.transactionId)
        .subscribe((transaction: Transaction) => {
          this.form.patchValue(transaction);
        });
    });
  }

  navigateToParent() {
    return this.router.navigate(this.editing
      ? ['../../'] : ['../'] , {relativeTo: this.route});
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    const action = this.editing
      ? this.transactionsService.update(+this.transactionId, {...this.form.value})
      : this.transactionsService.add({...this.form.value});

    action.subscribe(() => this.navigateToParent());
  }

  onCancel() {
    this.navigateToParent();
  }
}
