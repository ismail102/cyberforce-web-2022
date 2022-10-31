import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultText: string;

  constructor(private fb: FormBuilder) {}

  @Output() eventEmitter = new EventEmitter<any>();
  ngOnInit(): void {
    this.defaultText = 'Login';
    this.loginForm = this.fb.group({
      userNameInput: [''],
      passwordInput: [''],
    });
  }

  loginSubmit() {
    let userName = this.loginForm.controls['userNameInput'].value;
    let password = this.loginForm.controls['passwordInput'].value;

    if (userName === 'Admin') {
      this.defaultText = 'Admin';
      this.eventEmitter.emit('Admin');
    } else {
      this.defaultText = userName;
      this.eventEmitter.emit(userName);
    }
  }
  getFormControls() {
    return this.loginForm.controls;
  }
}
