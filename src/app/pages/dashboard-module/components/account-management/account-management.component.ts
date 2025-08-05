// src/app/pages/dashboard-module/account-management/account-management.component.ts

import { Component, OnInit } from '@angular/core';
export interface Review {
  id: number;
  reviewText: string;
  rating: number; 
  author: string;
  reviewedEntity: string;
  date: Date;
}


@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.less']
})
export class AccountManagementComponent implements OnInit {
 
  
  searchText: string = '';

  
  private allReviews: Review[] = [];

  
  public filteredReviews: Review[] = [];

  constructor() { }

  ngOnInit(): void {
    this.allReviews = [
      { id: 101, reviewText: 'Excellent and fast service, I highly recommend them.', rating: 5, author: 'Ahmed Mahmoud', reviewedEntity: 'United Insurance Co.', date: new Date('2025-06-10T10:00:00') },
      { id: 102, reviewText: 'The app is easy to use, but their prices are a bit high.', rating: 3, author: 'Sarah Abdullah', reviewedEntity: 'Gulf Insurance Co.', date: new Date('2025-06-11T14:30:00') },
      { id: 103, reviewText: 'This is an inappropriate and offensive review with bad language.', rating: 1, author: 'Ali Hassan', reviewedEntity: 'Amanah Auto Repair', date: new Date('2025-06-12T09:00:00') },
      { id: 104, reviewText: 'A very good experience, the technical support was very cooperative.', rating: 4, author: 'Fatima Khalid', reviewedEntity: 'United Insurance Co.', date: new Date('2025-06-12T18:45:00') }
    ];

  
    this.filteredReviews = [...this.allReviews];
  }


  search(): void {
    const searchTerm = this.searchText.toLowerCase().trim();

    if (!searchTerm) {
   
      this.filteredReviews = [...this.allReviews];
    } else {
   
      this.filteredReviews = this.allReviews.filter(review =>
        review.reviewText.toLowerCase().includes(searchTerm)
      );
    }
  }

  deleteReview(id: number): void {
   
    this.allReviews = this.allReviews.filter(review => review.id !== id);
    this.filteredReviews = this.filteredReviews.filter(review => review.id !== id);
    
    console.log(`Review with ID: ${id} has been deleted.`);
  }
}