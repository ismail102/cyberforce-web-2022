import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  defaultText: any;

  constructor(public sharedService: SharedService, private router: Router) {}
  @ViewChild(LoginComponent) private loginComponent: LoginComponent;

  ngOnInit(): void {
    let userId = this.sharedService.getUserId();
    if (!userId || userId == '') {
      this.sharedService.setUserId(null);
      this.sharedService.setUserRole(null);
    }

    logOutUser() {
      this.sharedService.setUserId(null);
      this.sharedService.setUserRole(null);
      this.router.navigate(['/login']); 
    }

    // this.sharedService.user.subscribe((data: string) => {
    //   console.log('EventEmitter: ', data);
    //   if (data) {
    //     this.defaultText = data;
    //   } else {
    //     this.defaultText = 'Login';
    //   }
    // });
  }

  // setDefaultText(data: string) {
  //   this.defaultText = data;
  // }
}
