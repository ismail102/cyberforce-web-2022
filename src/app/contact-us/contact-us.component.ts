import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataGetService } from '../services/data-get.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private dataGetService: DataGetService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nameInput: [''],
      emailInput: [''],
      phoneInput: [''],
      fileUpload: ['/filepath'],
    });
  }

  loginContactInfo() {
    let name = this.contactForm.controls['nameInput'].value;
    let email = this.contactForm.controls['emailInput'].value;
    let phone = this.contactForm.controls['phoneInput'].value;
    let file = this.contactForm.controls['fileUpload'].value;

    this.dataGetService
      .submitContact(name, email, phone, file)
      .subscribe((data: any) => {
        console.log('Contact Submission Response: ', data);
      });
  }
}
