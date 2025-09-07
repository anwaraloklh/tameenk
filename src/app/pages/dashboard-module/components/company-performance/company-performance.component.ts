import { Component } from '@angular/core';
import { AddCompanyService } from '../../services/AddCompanyService';

@Component({
  selector: 'app-company-performance',
  templateUrl: './company-performance.component.html',
  styleUrls: ['./company-performance.component.less']
})
export class CompanyPerformanceComponent {
  companies: any[] = [];
  totalCompanies = 0;
  topCompany: any = { name: '' };
  averageSatisfaction = 0;

  constructor(private companyService: AddCompanyService) {}

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(res => {
      if (res && Array.isArray(res)) {
        this.companies = res.map((company: any) => ({
          name: company.name,
    
          customerSatisfaction: company.user_rate || 0,
          performanceRating: company.average_rate || 0, 
          notes: company.bio || 'No notes'
        }));


        this.companies.sort((a, b) => b.performanceRating - a.performanceRating);

     
        this.totalCompanies = this.companies.length;


        this.topCompany = this.companies[0] || { name: '' };

 
        this.averageSatisfaction = this.totalCompanies > 0 ? 
          Math.round(
            this.companies.reduce((sum, c) => sum + (c.customerSatisfaction || 0), 0) / this.totalCompanies
          ) : 0;
      }
    }, err => {
      console.error('Error loading companies', err);
    });
  }
}
