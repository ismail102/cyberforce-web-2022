import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  defaultText: string;

  constructor(public sharedService: SharedService) {}
  @ViewChild(LoginComponent) private loginComponent: LoginComponent;

  ngOnInit(): void {
    let userId = this.sharedService.getUserId();
    if (!userId || userId == '') {
      this.sharedService.setUserId('Login');
    }
    this.defaultText = this.sharedService.getUserId();
    // this.sharedService.user.subscribe((data: string) => {
    //   console.log('EventEmitter: ', data);
    //   if (data) {
    //     this.defaultText = data;
    //   } else {
    //     this.defaultText = 'Login';
    //   }
    // });
  }

  setDefaultText(data: string) {
    this.defaultText = data;
  }
}
