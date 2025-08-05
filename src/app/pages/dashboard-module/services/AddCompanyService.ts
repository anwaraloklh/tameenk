import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddCompaniesList } from '../models/place-category/place-category-list';


@Injectable()
export class AddCompanyService {

  private baseUrl = 'https://taaminak.tahamove.com/api/admin/companies';

  constructor(
    private http: HttpClient,

  ) {}


  getAllCompanies(): Observable<AddCompaniesList[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<AddCompaniesList[]>(this.baseUrl, { headers });
  }




createCompany(data: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

 
  return this.http.post(`${this.baseUrl}`, data, { headers });
}
  deleteCompany(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  approveCompany(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
   
    const url = `${this.baseUrl}/${id}/approve`;
    return this.http.post(url, {}, { headers });
  }

    
}
