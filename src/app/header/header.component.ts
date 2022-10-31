import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  defaultText: string;

  constructor() {}
  @ViewChild(LoginComponent) loginComponent: any;

  ngOnInit(): void {
    this.defaultText = 'Login';
  }
  setDefaultText(data: string) {
    this.defaultText = data;
  }
}
