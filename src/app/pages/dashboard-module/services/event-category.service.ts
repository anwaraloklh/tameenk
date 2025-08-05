import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventCategoryList } from '../models/event-category/event-category-list';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventCategoryService {

  private baseUrl = 'https://taaminak.tahamove.com/api/admin/categories';

  constructor(private http: HttpClient) {}





  getList(): Observable<EventCategoryList[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
  
    return this.http.get<EventCategoryList[]>(this.baseUrl, { headers });
  }
  

  createCategory(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
   
    return this.http.post(`${this.baseUrl}`, data, { headers });
  }
  
  
  update(id: number, data: { title: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
  }
  

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/${id}`,{headers});
  }

}
