import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userName = new BehaviorSubject<string>('');
  user = this.userName.asObservable();
  constructor() {}

  setLastValueInHeader(data: string) {
    this.userName.next(data);
  }
}
