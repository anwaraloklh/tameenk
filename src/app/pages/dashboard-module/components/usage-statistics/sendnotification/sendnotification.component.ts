import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-sendnotification',

  templateUrl: './sendnotification.component.html',
  styleUrl: './sendnotification.component.less'
})
export class SendnotificationComponent {
  @Input() user: any;

  notificationTitle = '';
  notificationBody = '';
  loading = false;

  constructor(private modalRef: NzModalRef, private userService: UserService) {}

  cancel(): void {
    this.modalRef.destroy(false);
  }

  sendNotification(): void {
    if (!this.user) return;

    this.loading = true;
    this.userService
      .sendNotification({
        user_id: this.user.id,
        title: this.notificationTitle,
        body: this.notificationBody,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.modalRef.destroy(true);
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
