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

  constructor(private sharedService: SharedService) {}
  @ViewChild(LoginComponent) private loginComponent: LoginComponent;

  ngOnInit(): void {
    this.defaultText = 'Login';
    this.sharedService.user.subscribe((data: string) => {
      this.defaultText = data;
    });
  }

  setDefaultText(data: string) {
    this.defaultText = data;
  }

  setLastValueInHeader() {}
}
