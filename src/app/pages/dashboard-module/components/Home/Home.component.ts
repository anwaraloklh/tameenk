import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Line, Pie } from '@antv/g2plot'; 
import { EventCategoryService } from '../../services/event-category.service';
import { AddCompanyService } from '../../services/AddCompanyService';
import { EventCategoryList } from '../../models/event-category/event-category-list';
import { AddCompaniesList } from '../../models/place-category/place-category-list';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  loading = false;

  companies: AddCompaniesList[] = [];
  activeCompanies = 0;
  inactiveCompanies = 0;
  topCompanies: { name: string; sales: number; color: string }[] = [];

  data: EventCategoryList[] = [];
  insuranceTypes: { name: string; progress: number; color: string }[] = [];

  constructor(
    private eventCategoryService: EventCategoryService,
    private companyService: AddCompanyService
  ) {}

  mainStats: { title: string; value: number; suffix: string; change: number }[] = [];

  ngOnInit(): void {
    this.loadCategories();
    this.loadCompanies();
    this.loadStatistics(); 
  }
  
  loadStatistics(): void {
    this.companyService.getAllUsers().subscribe({
      next: (res) => {
        const stats = res.data;
  
        this.mainStats = [
          { title: 'العملاء', value: stats.user_count, suffix: '', change: this.getRandomChange() },
          { title: 'طلبات اليوم', value: stats.plan_request_count, suffix: '', change: this.getRandomChange() },
          { title: 'إجمالي التأمينات', value: this.getRandomNumber(20000, 100000), suffix: 'USD', change: this.getRandomChange() },
          { title: 'نسبة النمو', value: this.getRandomNumber(1, 15), suffix: '%', change: this.getRandomChange() }
        ];
      },
      error: (err) => {
        console.error('Error loading statistics', err);
      }
    });
  }
  
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  getRandomChange(): number {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * this.getRandomNumber(1, 10);
  }
  
  loadCategories(): void {
    this.loading = true;
    this.eventCategoryService.getList().subscribe({
      next: (categories: EventCategoryList[]) => {
        this.data = categories.map((ad: EventCategoryList) => ({
          ...ad,
          image: ad.image ? `https://taaminak.tahamove.com/storage/${ad.image}` : ''
        }));

        this.insuranceTypes = this.data.map((cat: EventCategoryList, index: number) => ({
          name: cat.title,
          progress: Math.floor(Math.random() * 60) + 30,
          color: this.getColor(index)
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.loading = false;
      }
    });
  }
  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (res: AddCompaniesList[]) => {
        this.companies = res.map((c) => ({
          ...c,
          image: c.image ? `https://taaminak.tahamove.com/storage/${c.image}` : ''
        }));
  
        this.activeCompanies = this.companies.filter(c => c.bio && c.bio.length > 0).length;
        this.inactiveCompanies = this.companies.length - this.activeCompanies;
  
        // ✅ الترتيب تنازلي حسب orders (بدلها بالخاصية الصحيحة عندك)
        this.topCompanies = this.companies
        .sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0))
        .slice(0, 5)
        .map((c, i) => ({
          name: c.name,
          sales: c.sales ?? (100 - i * 15), // لو ما في قيمة يستخدم الوهمية
          color: this.getColor(i)
        }));
      
      },
      error: (err) => {
        console.error('Error fetching companies', err);
      }
    });
  }
  

  getColor(index: number): string {
    const colors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#13c2c2', '#722ed1'];
    return colors[index % colors.length];
  }

  ngAfterViewInit(): void {
    const line = new Line('tradingChartContainer', {
      data: [
        { date: '2025-01', value: 1200 },
        { date: '2025-02', value: 1500 },
        { date: '2025-03', value: 900 },
        { date: '2025-04', value: 1700 },
        { date: '2025-05', value: 1600 },
        { date: '2025-06', value: 2000 },
      ],
      xField: 'date',
      yField: 'value',
      smooth: true,
      animation: { appear: { animation: 'path-in', duration: 1500 } },
      point: { size: 5, shape: 'diamond', style: { fill: 'white', stroke: '#5B8FF9', lineWidth: 2 } },
      tooltip: { showMarkers: true },
      interactions: [{ type: 'marker-active' }],
      xAxis: { grid: { line: { style: { stroke: '#e0e0e0' } } }, line: { style: { stroke: '#999' } } },
      yAxis: { grid: { line: { style: { stroke: '#e0e0e0', lineDash: [4, 4] } } }, line: { style: { stroke: '#999' } } },
      color: (datum) => datum['value'] > 1600 ? '#52c41a' : datum['value'] > 1300 ? '#faad14' : '#f5222d',
    });
    line.render();

    const pie = new Pie('insuranceTypePie', {
      data: [
        { type: 'تأمين صحي', value: 40 },
        { type: 'تأمين سيارات', value: 30 },
        { type: 'تأمين حياة', value: 20 },
        { type: 'تأمين ممتلكات', value: 10 },
      ],
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: { type: 'outer', content: '{name} {percentage}' },
      interactions: [{ type: 'element-active' }],
    });
    pie.render();
  }
}
