import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   userNameInput: [''],
    //   passwordInput: [''],
    // });
  }

  loginSubmit() {
    // let userName = this.loginFrom.controls.userNameInput.value;
  }
}
