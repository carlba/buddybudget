import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private UPLOAD_URL = `${this.backendUrl}/transactions/batch/xlxs`;
  public uploadChanges$ = new Subject();

  constructor(
    private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string
  ) {}

  public upload(formData, format: 'skandia' | 'norwegian' ) {

    return this.http.post<any>(this.UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events',
      params: {format}
    }).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          this.uploadChanges$.next(event.body);
        }
      })
    );
  }

}
