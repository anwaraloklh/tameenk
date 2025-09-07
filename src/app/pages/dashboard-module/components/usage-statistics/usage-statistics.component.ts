import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SendnotificationComponent } from './sendnotification/sendnotification.component';


@Component({
  selector: 'app-usage-statistics',
 
  templateUrl: './usage-statistics.component.html',
  styleUrl: './usage-statistics.component.less'
})
export class UsageStatisticsComponent {
  
  totalUsers: number = 0;
  activeSessions: number = 0;
  avgSessionDuration: number = 0;
  usageData: User[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.usageData = users;
        this.calculateStatistics();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
        this.message.error('Failed to load users');
        this.loading = false;
      }
    });
  }

  toggleBlock(user: User): void {
    const request$ = user.blocked
      ? this.userService.unblockUser(user.id)
      : this.userService.blockUser(user.id);

    request$.subscribe({
      next: () => {
        user.blocked = !user.blocked;
        const action = user.blocked ? 'blocked' : 'unblocked';
        this.message.success(`User ${action} successfully`);
        this.calculateStatistics(); 
      },
      error: (err) => {
        console.error('❌ Error toggling block status:', err);
        this.message.error('Failed to update user status');
      }
    });
  }

  calculateStatistics(): void {
    this.totalUsers = this.usageData.length;
    this.activeSessions = this.usageData.filter(u => !u.blocked).length;

    const validAvgTimes = this.usageData
      .map(u => u.avgTime)
      .filter((time): time is number => typeof time === 'number');

    if (validAvgTimes.length > 0) {
      const sum = validAvgTimes.reduce((acc, curr) => acc + curr, 0);
      this.avgSessionDuration = parseFloat((sum / validAvgTimes.length).toFixed(2));
    } else {
      this.avgSessionDuration = 0;
    }
  }
  openNotificationModal(user: any): void {
    const modalRef = this.modal.create({
      nzTitle: 'Send Notification',
      nzContent: SendnotificationComponent,
      nzFooter: null
    });
  
   
    modalRef.componentInstance!.user = user;
  
    modalRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }
  
  


}
