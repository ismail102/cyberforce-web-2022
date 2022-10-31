import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultText: string;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  @Output() eventEmitter = new EventEmitter<any>();
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userNameInput: [''],
      passwordInput: [''],
    });
  }

  loginSubmit() {
    let userName = this.loginForm.controls['userNameInput'].value;
    let password = this.loginForm.controls['passwordInput'].value;

    this.defaultText = userName;
    this.sharedService.setLastValueInHeader(this.defaultText);
  }
  getFormControls() {
    return this.loginForm.controls;
  }
}
