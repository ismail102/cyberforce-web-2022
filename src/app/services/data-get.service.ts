import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataGetService {
  constructor(private http: HttpClient) {}

  // Node/Express API
  REST_API: string = 'http://10.0.108.76:8080/api';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // Get Data
  getFiles(): Observable<any> {
    let API_URL = `${this.REST_API}/solar-arr`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // getFiles(): Observable<any> {
  //   const url = '/api/solar';
  //   return this.http.get<any>(url).pipe(catchError(this.handleError));
  //   // return of([
  //   //   { name: 'ismail', isAvailable: true },
  //   //   { name: 'sai', isAvailable: true },
  //   // ]);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
