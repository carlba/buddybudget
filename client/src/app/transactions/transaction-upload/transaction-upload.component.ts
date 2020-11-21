import { Component, OnInit, Output } from '@angular/core';
import { UploadService } from './upload.service';
import { Subject } from 'rxjs';
import { Transaction } from '../../../../../src/transactions/transaction.entity';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-upload',
  templateUrl: './transaction-upload.component.html',
  styleUrls: ['./transaction-upload.component.scss']
})
export class TransactionUploadComponent implements OnInit {
  uploadChanges$: Subject<Transaction[]> = new Subject();
  formats = ['skandia', 'norwegian', 'lansforsakringar'];
  format = new FormControl();
  @Output() uploadChanges = this.uploadChanges$.asObservable();
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append('upload', file);
    this.uploadService.upload(formData, file.type, this.format.value).subscribe();
  }
}
