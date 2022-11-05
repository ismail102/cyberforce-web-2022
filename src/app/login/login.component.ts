import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataGetService } from '../services/data-get.service';
import { SharedService } from '../services/shared.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultText: any;
  contactInfo: any[];

  constructor(
    private fb: FormBuilder,
    public sharedService: SharedService,
    private dataGetService: DataGetService,
    private router: Router
  ) {}

  @Output() eventEmitter = new EventEmitter<any>();
  ngOnInit(): void {
    // this.defaultText = 'Login';
    // this.sharedService.setLastValueInHeader(this.defaultText);
    let userId = this.sharedService.getUserId();
    if (!userId || userId == '') {
      this.sharedService.setUserId('');
      this.sharedService.setUserRole('');
    }
    this.defaultText = this.sharedService.getUserId();
    this.loginForm = this.fb.group({
      userNameInput: [''],
      passwordInput: [''],
    });
  }

  loginSubmit() {
    let userName = this.loginForm.controls['userNameInput'].value;
    let password = this.loginForm.controls['passwordInput'].value;

    this.sharedService.setUserId(userName);
    this.sharedService.setUserRole('Admin');

    this.dataGetService
      .authentication(userName, password)
      .subscribe((res: any) => {
        console.log('Res: ', res);
        this.sharedService.setUserId(userName);
        this.sharedService.setUserRole('');
        if (res['msg'] == 'fail') {
          alert('Failed to Log in.');
        } else {
          console.log('User role: ', res['data']);
          if (res['data'] == 'Admin') {
            this.sharedService.setUserId('Admin');
            this.sharedService.setUserRole('Admin');
          }
          // this.sharedService.setLastValueInHeader(this.defaultText);
        }
      });
    this.getFilesFromServer();
  }

  // tokenFromUI: string = 'System-Unwary-Random-Canister9';
  // encryptUsingAES256() {
  //   let data = '5!ys!hhsds';
  //   let cyp = CryptoJS.AES.encrypt(
  //     JSON.stringify(data),
  //     this.tokenFromUI
  //   ).toString();
  //   console.log('C: ', cyp);
  // }

  // decryptUsingAES256() {
  //   let data = 'U2FsdGVkX1+Wr8nWRxBSB/wzeFbeNPzRuIwjKXp3sE8=';

  //   const bytes = CryptoJS.AES.decrypt(data, this.tokenFromUI);
  //   if (bytes.toString()) {
  //     let d = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     console.log('D: ', d);
  //   }
  // }

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
