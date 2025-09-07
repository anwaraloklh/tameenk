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
    
    bio: FormControl<string>;
  }>;
  imagePreviewUrl: string | null = null;
  selectedImageFile: File | null = null;
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
     
      bio: this.fb.control('')
    });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

    
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

 
  submitForm(): void {
    if (this.validateForm.valid && this.selectedImageFile) {
      const formData = new FormData();

      
      Object.keys(this.validateForm.controls).forEach(key => {
        formData.append(key, this.validateForm.get(key)!.value);
      });

      
      formData.append('image', this.selectedImageFile);

      
      this.addCompanyService.createCompany(formData).subscribe({
        next: (res) => {
          console.log('Updated successfully', res);
          this.modalRef.close(true);
        },
        error: (err) => {
          console.error('Error updating company', err);
        }
      });
    }
  }

  close(): void {
    this.modalRef.close();
  }
}
