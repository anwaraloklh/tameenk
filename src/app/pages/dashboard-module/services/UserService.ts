import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://taaminak.tahamove.com/api/admin/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/index`, {
      headers: this.getAuthHeaders()
    });
  }
  blockUser(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/block`, null, {
      headers: this.getAuthHeaders()
    });
  }
  
  unblockUser(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/unblock`, null, {
      headers: this.getAuthHeaders()
    });
  }
  sendNotification(payload: { user_id: number; title: string; body: string }) {
    const token = localStorage.getItem('token'); // أو من AuthService
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.http.post('https://taaminak.tahamove.com/api/admin/notifications/send-to-user', payload, { headers });
  }
  
}
