import { Component, OnInit } from '@angular/core';
import { AddCompaniesList } from '../../models/place-category/place-category-list';
import { AddCompanyService } from '../../services/AddCompanyService';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  dataSet: AddCompaniesList[] = [];
  loading = false;

  constructor(private companyService: AddCompanyService,
    private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.companyService.getAllCompanies().subscribe({

      next: (res) => {
        this.loading = false;
        this.dataSet = res;
      },
      error: () => {
        this.loading = false;
        console.error('Failed to load companies');
      }
    });
  }

  delete(id: number): void {
    this.companyService.deleteCompany(id).subscribe({
      next: () => this.loadCompanies(),
      error: () => console.error('Delete failed')
    });
  }


  openCreateModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Create  Company',
      nzContent: CreateCompanyComponent,
      nzFooter: null,
    });

    modalRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadCompanies(); 
      }
    });
  }
  showFullBio(data: any): void {
   
    this.modal.create({
      nzTitle: 'Bio',
      nzContent: data.bio,
      nzFooter: null
    });
  }
  
}
