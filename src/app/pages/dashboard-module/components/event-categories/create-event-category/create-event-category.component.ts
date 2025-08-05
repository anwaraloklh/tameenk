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
    imageUrl: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private eventCategoryService: EventCategoryService,
    private modalRef: NzModalRef
  ) {
    this.validateForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      imageUrl: this.fb.control('', Validators.required),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = new FormData();
      formData.append('title', this.validateForm.value.title!);
      formData.append('image', this.validateForm.value.imageUrl!); 

      this.eventCategoryService.createCategory(formData).subscribe({
        next: () => {
          this.modalRef.close(true);
        },
        error: (error) => {
          console.error('Create category failed', error);
        }
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
