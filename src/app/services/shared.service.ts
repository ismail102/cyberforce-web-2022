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

  setUserId(userId: any) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId || userId == '') {
      localStorage.setItem('userId', '');
    }
    userId = localStorage.getItem('userId');
    return userId;
  }

  setUserRole(userRole: any) {
    localStorage.setItem('userRole', userRole);
  }

  getUserRole() {
    let userRole = localStorage.getItem('userId');
    if (!userRole || userRole == '') {
      localStorage.setItem('userId', '');
    }
    userRole = localStorage.getItem('userRole');
    return userRole;
  }
}
