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
    sessionStorage.setItem('userId', userId);
  }

  getUserId() {
    let userId = sessionStorage.getItem('userId');
    if (!userId || userId == '') {
      sessionStorage.setItem('userId', '');
    }
    userId = sessionStorage.getItem('userId');
    return userId;
  }

  setUserRole(userRole: any) {
    sessionStorage.setItem('userRole', userRole);
  }

  getUserRole() {
    let userRole = sessionStorage.getItem('userId');
    if (!userRole || userRole == '') {
      sessionStorage.setItem('userId', '');
    }
    userRole = sessionStorage.getItem('userRole');
    return userRole;
  }
}
