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
      fileUpload: [''],
    });
  }
  file: File;
  fileUpload(event: any) {
    const files: FileList = event.target.files;
    this.file = files[0];
  }

  submitContactInfo() {
    let name = this.contactForm.controls['nameInput'].value;
    let email = this.contactForm.controls['emailInput'].value;
    let phone = this.contactForm.controls['phoneInput'].value;
    let fileName = this.file.name;
    this.dataGetService
      .submitContact(name, email, phone, this.file, fileName)
      .subscribe((data: any) => {
        console.log('Contact Submission Response: ', data);
      });
  }
}
