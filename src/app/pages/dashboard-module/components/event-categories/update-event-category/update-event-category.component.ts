import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { EventCategoryList } from '../../../models/event-category/event-category-list';
import { EventCategoryService } from '../../../services/event-category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-event-category',
  templateUrl: './update-event-category.component.html',
  styleUrls: ['./update-event-category.component.css']
})
export class UpdateEventCategoryComponent implements OnInit {

  eventCategory!: EventCategoryList;

  validateForm!: FormGroup<{
    title: FormControl<string>;
    
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    @Inject(NZ_MODAL_DATA) public modalData: any,
    private eventCategoryService: EventCategoryService,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.eventCategory = this.modalData.eventCategory;

    this.validateForm = this.fb.group({
      title: [this.eventCategory.title, [Validators.required]],
   
    });
  }

  submitForm(): void {
    if (this.validateForm.invalid) return;
  
    const newData = {
      title: this.validateForm.value.title!
    };
  
    this.eventCategoryService.update(this.eventCategory.id, newData).subscribe({
      next: () => {
        this.modalRef.close(true);
      },
      error: (err) => {
        console.error('Update category failed', err);
      }
    });
  }
  

  close(): void {
    this.modalRef.close();
  }
}
