import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataGetService } from '../services/data-get.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  files: FileList;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private dataGetService: DataGetService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  fileUpload(event: any) {
    this.files = event.target.files;
  }

  submitContactInfo() {
    let name = this.contactForm.controls['nameInput'].value;
    let email = this.contactForm.controls['emailInput'].value;
    let phone = this.contactForm.controls['phoneInput'].value;
    let fileName = '';
    if (this.files && this.files.length > 0) {
      fileName = this.files[0].name;
    } else {
      alert('Please upload a file.');
      return;
    }

    this.dataGetService
      .submitContact(name, email, phone, this.files[0], fileName)
      .subscribe(
        (data: any) => {
          alert(data);
          this.createForm();
        },
        (err: any) => {
          alert(err);
        }
      );
  }

  createForm() {
    this.contactForm = this.fb.group({
      nameInput: [''],
      emailInput: [''],
      phoneInput: [''],
      fileUpload: [''],
    });
  }
}
