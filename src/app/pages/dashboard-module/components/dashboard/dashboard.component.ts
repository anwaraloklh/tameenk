import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  isSidebarVisible = false;

  ngOnInit() {
  }
  constructor(
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {}
  
    
  confirmLogout(): void {
    this.modal.confirm({
      nzTitle: 'هل أنت متأكد من تسجيل الخروج؟',
      nzContent: 'سيتم إنهاء جلستك الحالية. هل تود المتابعة؟',
      nzOkText: 'نعم، تسجيل الخروج',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'إلغاء',
      nzOnOk: () => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
  
        this.http.post('https://taaminak.tahamove.com/api/admin/logout', {}, { headers }).subscribe({
          next: () => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/', 'auth', 'login']);
            this.notification.success('تم تسجيل الخروج', 'لقد تم تسجيل خروجك بنجاح.');
          },
          error: (err) => {
            console.error('فشل تسجيل الخروج من الخادم:', err);
            this.notification.error('فشل تسجيل الخروج', 'حدث خطأ أثناء تسجيل الخروج من الخادم.');
          }
        });
      },
      nzOnCancel: () => {
        this.notification.info('تم إلغاء العملية', 'تم إلغاء عملية تسجيل الخروج.');
      }
    });
  }
}
