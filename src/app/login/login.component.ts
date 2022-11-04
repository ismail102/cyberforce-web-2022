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
  files: any[];
  emails: any[];

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
    this.getEmailsFromServer();
  }

  getFilesFromServer() {
    this.dataGetService.getFiles().subscribe((data: any) => {
      this.files = data;
    });
  }

  downloadFile(fileName: string) {
    this.dataGetService.downloadFile(fileName).subscribe(
      (data) => {
        saveAs(data, fileName);
        // this.fileSaverService.save(data, fileName);
      },
      (err) => {
        alert('Problem while downloading the file.');
        console.error(err);
      }
    );
  }

  getEmailsFromServer() {
    this.emails = [
      {
        id: 'email-1',
        title: '[CyberForce-Participants] Login issues',
        text: `[EXTERNAL EMAIL ALERT]: Verify sender before opening links or attachments.

        We are aware of the login issues. Please refrain from trying multiple times. We will resend credentials in the morning. Please be sure to get yourself on discord as moving forward I will not be sending emails. Communications are done via Discord for this competition as well as help
        
        Thank you,
        Amanda L Theel
        
        Sent from my iPhone
        `,
        isAvailable: true,
      },
      {
        id: 'email-2',
        title:
          'Preparation for CyberForce 2022 Competition | CyberSalukis | Meeting # 2',
        text: `Hi Everyone, Good Morning!

        I have attached the notes (posted in our Discord server as well) from the last meeting and updated our OneDrive folder. Please let me know if anyone has any issue accessing that folder.
        
        As we are yet to get access to the competition environment, let's postpone today's meeting. Although if we are given access by today afternoon, I will be up for a meeting later today.
        
        But I would prefer an in-person meetup tomorrow at or around 05:30 PM at EGR A0321/A0409D. Please email using 'Reply to All' or text on our Discord server for any preference or issues regarding the meeting.
        
        
        @Spencer, Trenton D, Could you kindly review the meeting notes and update where required?
        `,
        isAvailable: true,
      },
    ];
  }

  getFormControls() {
    return this.loginForm.controls;
  }
}
