import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataGetService } from '../services/data-get.service';
import { SharedService } from '../services/shared.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultText: string;
  contactInfo: any[];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private dataGetService: DataGetService
  ) {}

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
    this.dataGetService.getFiles().subscribe((data: any) => {
      this.contactInfo = data;
    });
  }

  downloadFile(fileName: string) {
    this.dataGetService.downloadFile(fileName).subscribe(
      (data) => {
        saveAs(data, fileName);
        alert(fileName + ' is ready to download.');
      },
      (err) => {
        alert('Problem while downloading the file.');
        console.error(err);
      }
    );
  }

  getFormControls() {
    return this.loginForm.controls;
  }
}
