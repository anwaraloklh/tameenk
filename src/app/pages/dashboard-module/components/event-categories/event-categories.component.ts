import { Component, OnInit } from '@angular/core';
import { EventCategoryList } from '../../models/event-category/event-category-list';
import { EventCategoryService } from '../../services/event-category.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateEventCategoryComponent } from './create-event-category/create-event-category.component';
import { UpdateEventCategoryComponent } from './update-event-category/update-event-category.component';

@Component({
  selector: 'app-event-categories',
  templateUrl: './event-categories.component.html',
  styleUrls: ['./event-categories.component.css']
})
export class EventCategoriesComponent implements OnInit {
  dataSet: EventCategoryList[] = [];
  loading = false;

  constructor(
    private eventCategoryService: EventCategoryService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.eventCategoryService.getList().subscribe({
      next: (categories) => {
        this.dataSet = categories.map((ad: EventCategoryList) => {
        
          return {
            ...ad,
            image: ad.image ? `https://taaminak.tahamove.com/storage/${ad.image}` : ''
          };
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Create  Category',
      nzContent: CreateEventCategoryComponent,
      nzFooter: null,
    });

    modalRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadCategories(); 
      }
    });
  }


  openUpdateModal(category: EventCategoryList): void {
    const modalRef = this.modal.create({
      nzTitle: 'Update  Category',
      nzContent: UpdateEventCategoryComponent,
      nzData: {
        eventCategory: category
      },
      nzFooter: null
    });
  
    modalRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadCategories();
      }
    });
  }

  
  deleteCategory(id: number): void {
    this.eventCategoryService.delete(id).subscribe({
      next: () => {
        this.loadCategories(); 
      },
      error: (err) => {
        console.error('Delete category failed', err);
      }
    });
  }
  

  
}
