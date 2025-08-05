import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/Home/Home.component';
import { DashboardRoutes } from './dashboard-routes';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
//import { CreatePlaceCategoryComponent } from './components/place-category/create-place-category/create-place-category.component';
//mport { UpdatePlaceCategoryComponent } from './components/place-category/update-place-category/update-place-category.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AddCompanyService } from './services/AddCompanyService';
import { CreateEventCategoryComponent } from './components/event-categories/create-event-category/create-event-category.component';
import { UpdateEventCategoryComponent } from './components/event-categories/update-event-category/update-event-category.component';
import { EventCategoriesComponent } from './components/event-categories/event-categories.component';
import { EventCategoryService } from './services/event-category.service';

import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRateModule } from 'ng-zorro-antd/rate'
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SettingsComponent } from './components/settings/settings.component';
import { InformationComponent } from './components/information/information.component';
import { CompanyPerformanceComponent } from './components/company-performance/company-performance.component';
import { UsageStatisticsComponent } from './components/usage-statistics/usage-statistics.component';
import { PaidAdsManagerComponent } from './components/paid-ads-manager/paid-ads-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCompanyComponent } from './components/add-company/create-company/create-company.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PaymentMethodsSettingsComponent } from './components/payment-methods-settings/payment-methods-settings.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';



@NgModule({
  declarations: [
    
    InformationComponent,
    AccountManagementComponent,
    DashboardComponent,
    HomeComponent,
    AddCompanyComponent,
    CreateEventCategoryComponent,
    UpdateEventCategoryComponent,
    EventCategoriesComponent,
    ProfileComponent,
    SettingsComponent,
    CompanyPerformanceComponent,
    UsageStatisticsComponent,
    PaidAdsManagerComponent,
    CreateCompanyComponent,
    PaymentMethodsSettingsComponent
  ],

  imports: [
  
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
 //   NzSpaceModule,
    CommonModule,
    NzCardModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzGridModule,
    ReactiveFormsModule,
    NzFormModule,
    NzPopconfirmModule,
    NzInputModule,
  //  NzSpaceModule,
    RouterModule.forChild(DashboardRoutes),
    NzBreadCrumbModule,
    NzStatisticModule,
    NzListModule,
    NzProgressModule,
    NzTagModule,
    NzRateModule,
    NzDividerModule,
    FormsModule,
    NzTagModule,
    NzDropDownModule,
    NzBadgeModule,
    NzCardModule,
    NzGridModule,
    NzListModule,
    NzTableModule,
    HttpClientModule,
    NzToolTipModule,
    NzTimelineModule,
    NzSkeletonModule,
    
  
  ],

  providers: [AddCompanyService, EventCategoryService],
})
export class DashboardModule {
}
