import { Component, OnInit, Output } from '@angular/core';
import { UploadService } from './upload.service';
import { Subject } from 'rxjs';
import { Transaction } from '../../../../../src/transactions/transaction.entity';

@Component({
  selector: 'app-transaction-upload',
  templateUrl: './transaction-upload.component.html',
  styleUrls: ['./transaction-upload.component.scss']
})
export class TransactionUploadComponent implements OnInit {
  uploadChanges$: Subject<Transaction[]> = new Subject();
  @Output() uploadChanges = this.uploadChanges$.asObservable();
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append('upload', file);
    console.log('got here onFilePicked');

    this.uploadService.upload(formData, 'skandia').subscribe();

  }
}
