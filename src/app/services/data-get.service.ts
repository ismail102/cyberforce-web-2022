import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class DataGetService {
  constructor(private http: HttpClient) {}

  // Node/Express API
  REST_API: string = 'http://10.0.108.79:3000/api';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // User Login
  authentication(userName: string, password: string): Observable<any> {
    let API_URL = `${this.REST_API}/auth`;
    let obj = Object.assign({});
    // password = this.encryptUsingAES256(password);
    obj.userName = userName;
    obj.password = password;
    return this.http.post(API_URL, obj, { headers: this.httpHeaders });
  }

  // encryptUsingAES256(data: string): string {
  //   let tokenFromUI = 'System-Unwary-Random-Canister9';
  //   let cyp = CryptoJS.AES.encrypt(
  //     JSON.stringify(data),
  //     tokenFromUI
  //   ).toString();
  //   return cyp;
  // }

  // Get Data
  getSolarArr(): Observable<any> {
    let API_URL = `${this.REST_API}/solar-arr`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Post Data
  submitContact(
    name: String,
    email: String,
    phone: String,
    file: File,
    fileName: String
  ) {
    let API_URL = `${this.REST_API}/contact-info`;
    let obj = Object.assign({});
    obj.name = name;
    obj.email = email;
    obj.phone = phone;
    obj.fileName = fileName;
    let formParams = new FormData();
    formParams.append('info', JSON.stringify(obj));
    formParams.append('file', file);
    return this.http.post(API_URL, formParams).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Get Files Data
  getFiles(): Observable<any> {
    let API_URL = `${this.REST_API}/files`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Download File
  downloadFile(fileName: string): Observable<any> {
    // Create url
    const fileDir = '/home/blueteam/web/upload/' + fileName;
    let API_URL = `${this.REST_API}/file-download`;
    var body = { fileDir: fileDir };

    return this.http
      .post(API_URL, body, {
        responseType: 'blob',
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

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
