import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EventCategoryService } from '../../../services/event-category.service';

@Component({
  selector: 'app-create-event-category',
  templateUrl: './create-event-category.component.html',
  styleUrls: ['./create-event-category.component.css']
})
export class CreateEventCategoryComponent {
  validateForm: FormGroup<{
    title: FormControl<string>;
  
  }>;
  imagePreviewUrl: string | null = null;
  selectedImageFile: File | null = null;
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
  constructor(
    private fb: NonNullableFormBuilder,
    private eventCategoryService: EventCategoryService,
    private modalRef: NzModalRef
  ) {
    this.validateForm = this.fb.group({
      title: this.fb.control('', Validators.required),
    
    });
  }

 
 
  submitForm(): void {
    if (this.validateForm.valid && this.selectedImageFile) {
      const formData = new FormData();

      
      Object.keys(this.validateForm.controls).forEach(key => {
        formData.append(key, this.validateForm.get(key)!.value);
      });

      
      formData.append('image', this.selectedImageFile);

      
      this.eventCategoryService.createCategory(formData).subscribe({
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
