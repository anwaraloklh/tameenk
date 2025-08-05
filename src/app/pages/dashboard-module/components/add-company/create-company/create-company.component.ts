// create-company.component.ts

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { AddCompanyService } from '../../../services/AddCompanyService';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.less'
})
export class CreateCompanyComponent {
  validateForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    password_confirmation: FormControl<string>;
    phone_number: FormControl<string>;
    address: FormControl<string>;
    license_number: FormControl<string>;
    image: FormControl<string>;
    bio: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private addCompanyService: AddCompanyService,
    private modalRef: NzModalRef
  ) {
    this.validateForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      password_confirmation: this.fb.control('', Validators.required),
      phone_number: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      license_number: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      bio: this.fb.control('')
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = new FormData();
      const values = this.validateForm.value;
  
      formData.append('name', values.name!);
      formData.append('email', values.email!);
      formData.append('password', values.password!);
      formData.append('password_confirmation', values.password_confirmation!);
      formData.append('phone_number', values.phone_number!);
      formData.append('address', values.address!);
      formData.append('license_number', values.license_number!);
      formData.append('bio', values.bio ?? '');
      formData.append('image', values.image!); 
  
      this.addCompanyService.createCompany(formData).subscribe({
        next: () => this.modalRef.close(true),
        error: (error) => console.error('Create company failed', error)
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  
  

  close(): void {
    this.modalRef.close();
  }
}
