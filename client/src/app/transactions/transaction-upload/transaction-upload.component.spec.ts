import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionUploadComponent } from './transaction-upload.component';

describe('TransactionUploadComponent', () => {
  let component: TransactionUploadComponent;
  let fixture: ComponentFixture<TransactionUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
