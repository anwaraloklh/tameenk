import { Routes } from "@angular/router";
import { HomeComponent } from "./components/Home/Home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import { EventCategoriesComponent } from "./components/event-categories/event-categories.component";
import { AccountManagementComponent } from "./components/account-management/account-management.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { InformationComponent } from "./components/information/information.component";
import { InsuranceAnalyticsComponent } from "./components/insurance-analytics/insurance-analytics.component";
import { CompanyPerformanceComponent } from "./components/company-performance/company-performance.component";
import { UsageStatisticsComponent } from "./components/usage-statistics/usage-statistics.component";
import { PaidAdsManagerComponent } from "./components/paid-ads-manager/paid-ads-manager.component";
import { AddCompanyComponent } from "./components/add-company/add-company.component";
import { PaymentMethodsSettingsComponent } from "./components/payment-methods-settings/payment-methods-settings.component";


export const DashboardRoutes: Routes = [
    {
      path: '',
      component:DashboardComponent,
      children: [{ path: 'home', component: HomeComponent },
      { path: 'home', component: HomeComponent},
    // { path: 'user', component: UserComponent},
      { path: 'add-companeis', component: AddCompanyComponent },
      { path: 'event-categories', component: EventCategoriesComponent },
      { path: 'account-management', component: AccountManagementComponent }   ,
      { path: 'setting', component: SettingsComponent }  ,
      { path: 'notification', component: NotificationComponent } ,
      { path: 'info-center', component: InformationComponent } ,
      { path: 'insurance-analytics', component: InsuranceAnalyticsComponent } ,
      { path: 'company-performance', component: CompanyPerformanceComponent } ,
      { path: 'usage-stats', component: UsageStatisticsComponent } ,
      { path: 'ads-manager', component: PaidAdsManagerComponent } ,
      { path: 'payment-Management', component: PaymentMethodsSettingsComponent } ,
    ],
    },
  ];
  