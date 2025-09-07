import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ads } from '../models/Ads'; 
@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private baseUrl = 'https://taaminak.tahamove.com/api/admin/ads';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllAds(): Observable<{ data: Ads[] }> {
    return this.http.get<{ data: Ads[] }>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }
  

  createAd(description: string, imageUrl: File): Observable<any> {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', imageUrl);
    return this.http.post(this.baseUrl, formData, {
      headers: this.getAuthHeaders()
    });
  }
  updateAdImage(id: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.baseUrl}/${id}?_method=PUT`, formData, {
      headers: this.getAuthHeaders()
    });
  }
  
  
  

  deleteAd(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
