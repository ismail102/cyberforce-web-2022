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
      name: [''],
      email: [''],
      phone: [''],
      file: ['/filepath'],
    });
  }

  loginContactInfo() {
    let name = this.contactForm.controls['name'].value;
    let email = this.contactForm.controls['email'].value;
    let phone = this.contactForm.controls['phone'].value;
    let file = this.contactForm.controls['file'].value;

    this.dataGetService
      .submitContact(name, email, phone, file)
      .subscribe((data: any) => {
        console.log('Contact Submission Response: ', data);
      });
  }
}
