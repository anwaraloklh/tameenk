import { Component } from '@angular/core';

@Component({
  selector: 'app-usage-statistics',
 
  templateUrl: './usage-statistics.component.html',
  styleUrl: './usage-statistics.component.less'
})
export class UsageStatisticsComponent {
  totalUsers = 1420;
  activeSessions = 238;
  avgSessionDuration = 12.6;

  usageData = [
    { user: 'Ahmad Al-Hassan', loginCount: 25, lastLogin: new Date('2025-06-01T10:15:00'), pagesVisited: 48, avgTime: 15 },
    { user: 'Layla Mohammed', loginCount: 18, lastLogin: new Date('2025-06-02T14:30:00'), pagesVisited: 38, avgTime: 11 },
    { user: 'Sami Al-Faraj', loginCount: 30, lastLogin: new Date('2025-06-02T09:45:00'), pagesVisited: 60, avgTime: 20 },
    { user: 'Mona Saleh', loginCount: 22, lastLogin: new Date('2025-06-01T20:10:00'), pagesVisited: 40, avgTime: 13 },
    { user: 'Khaled Nasser', loginCount: 15, lastLogin: new Date('2025-06-03T08:00:00'), pagesVisited: 35, avgTime: 10 },
    { user: 'Fatima Zahra', loginCount: 19, lastLogin: new Date('2025-06-02T12:00:00'), pagesVisited: 44, avgTime: 16 },
    { user: 'Omar Youssef', loginCount: 27, lastLogin: new Date('2025-06-01T18:30:00'), pagesVisited: 50, avgTime: 17 }
  ];
}
