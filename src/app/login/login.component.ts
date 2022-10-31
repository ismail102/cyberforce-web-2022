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
  files: any[];

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  @Output() eventEmitter = new EventEmitter<any>();
  ngOnInit(): void {
    this.defaultText = 'Login';
    this.sharedService.setLastValueInHeader(this.defaultText);
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
    this.getFilesFromServer();
  }

  getFilesFromServer() {
    this.files = [
      {
        name: 'CFC_Blue_Team_Website_Requirements_2022.pdf',
        isAvailable: true,
      },
      {
        name: 'Fake-Company-Logos - Copy.pptx',
        isAvailable: true,
      },
      {
        name: 'CyberForce_Competition_Blue_Team_AWS_and_VPN3.pdf',
        isAvailable: true,
      },
      {
        name: 'CFC_Blue_Team_Website_Requirements_2022.pdf',
        isAvailable: true,
      },
    ];
  }

  getFormControls() {
    return this.loginForm.controls;
  }
}
