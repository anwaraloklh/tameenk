import { Component } from '@angular/core';

@Component({
  selector: 'app-company-performance',

  templateUrl: './company-performance.component.html',
  styleUrl: './company-performance.component.less'
})
export class CompanyPerformanceComponent {
  companies = [
    { name: 'شركة الأمان', orders: 1200, customerSatisfaction: 88, performanceRating: 'Excellent', notes: 'رائدة السوق' },
    { name: 'شركة الوفاء', orders: 900, customerSatisfaction: 82, performanceRating: 'Good', notes: 'تحسن مستمر' },
    { name: 'شركة السلام', orders: 750, customerSatisfaction: 78, performanceRating: 'Average', notes: 'تحديات في التسويق' },
    { name: 'شركة الرؤية', orders: 600, customerSatisfaction: 85, performanceRating: 'Good', notes: 'خدمة عملاء ممتازة' },
    { name: 'شركة النجاح', orders: 450, customerSatisfaction: 80, performanceRating: 'Average', notes: 'حاجة لتحسين الجودة' }
  ];

  totalCompanies = this.companies.length;
  averageSatisfaction = 0;
  topCompany = this.companies[0];

  pieChartGradient = '';

  ngOnInit(): void {
    this.calculateAverageSatisfaction();
    this.determineTopCompany();
    this.updatePieChart();
  }

  calculateAverageSatisfaction(): void {
    const total = this.companies.reduce((sum, c) => sum + c.customerSatisfaction, 0);
    this.averageSatisfaction = Math.round(total / this.totalCompanies);
  }

  determineTopCompany(): void {
    this.topCompany = this.companies.reduce((prev, current) => (prev.orders > current.orders) ? prev : current);
  }

  updatePieChart(): void {
    const degree = (this.averageSatisfaction / 100) * 360;
    this.pieChartGradient = `conic-gradient(#4caf50 0deg ${degree}deg, #ddd ${degree}deg 360deg)`;
  }
}
