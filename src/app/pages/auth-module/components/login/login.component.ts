import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [
    NzIconModule,
    NzSpaceModule,
    CommonModule,
    NzCardModule,
    NzLayoutModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class LoginComponent {
  validateForm: FormGroup<{
  
    email: FormControl<string>;
    password: FormControl<string>;
   
  }> = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });

  constructor(
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private http: HttpClient
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;

      this.http.post('https://taaminak.tahamove.com/api/admin/login', formData).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token); 
          this.notification.success('نجاح', 'تم تسجيل الدخول بنجاح');
        
          this.router.navigate(['ui', 'home']);
        },
        error: (err) => {
          console.error('فشل تسجيل الدخول:', err);
          this.notification.error('خطأ', 'فشل تسجيل الدخول. تأكد من صحة البيانات.');
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

  reset(): void {
    this.validateForm.reset();
    this.notification.info('تم الإفراغ', 'تمت عملية مسح البيانات بنجاح');
  }
}
