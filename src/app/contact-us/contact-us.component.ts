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
    if (!this.isValid(name, email, phone)) {
      alert('Please fill each field.');
      return;
    }

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
          console.log('Data: ', data);
          alert('Thank you!');
          this.createForm();
        },
        (err: any) => {
          alert(err);
        }
      );
  }

  isValid(name: string, email: string, phone: string): boolean {
    if (name == '' || name == undefined) return false;
    if (email == '' || email == undefined) return false;
    if (phone == '' || phone == undefined) return false;
    return true;
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
