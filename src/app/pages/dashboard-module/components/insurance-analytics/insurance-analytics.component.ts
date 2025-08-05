import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-insurance-analytics',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzTableModule],
  templateUrl: './insurance-analytics.component.html',
  styleUrl: './insurance-analytics.component.less'
})
export class InsuranceAnalyticsComponent {
  stats = [
    { title: 'Total Policies', value: 12450, icon: 'file-done', color: '#52c41a' },
    { title: 'Pending Claims', value: 230, icon: 'alert', color: '#faad14' },
    { title: 'Approved Claims', value: 9800, icon: 'check-circle', color: '#1890ff' },
    { title: 'Rejected Claims', value: 120, icon: 'close-circle', color: '#f5222d' }
  ];

  topCompanies = [
    { name: 'شركة التأمين الوطنية', policies: 3500, satisfaction: '91%' },
    { name: 'شركة الحياة للتأمين', policies: 2700, satisfaction: '88%' },
    { name: 'أمان للتأمين', policies: 2100, satisfaction: '85%' },
    { name: 'الأمانة للتأمين', policies: 1800, satisfaction: '79%' }
  ];
}
