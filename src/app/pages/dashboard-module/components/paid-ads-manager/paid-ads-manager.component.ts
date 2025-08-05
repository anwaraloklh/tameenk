import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-paid-ads-manager',
  
  templateUrl: './paid-ads-manager.component.html',
  styleUrl: './paid-ads-manager.component.less'
})
export class PaidAdsManagerComponent  {
  campaigns = [
    { name: 'Spring Sale', budget: 10000, revenue: 13000, roi: 1.3 },
    { name: 'New Product Launch', budget: 15000, revenue: 10000, roi: 0.66 },
    { name: 'Black Friday', budget: 20000, revenue: 35000, roi: 1.75 },
    { name: 'Holiday Deals', budget: 12000, revenue: 9000, roi: 0.75 },
  ];

  get totalBudget() {
    return this.campaigns.reduce((sum, c) => sum + c.budget, 0);
  }

  get avgROI() {
    if (!this.campaigns.length) return 0;
    const totalROI = this.campaigns.reduce((sum, c) => sum + c.roi, 0);
    return totalROI / this.campaigns.length;
  }

  editCampaign(campaign: any) {
    alert(`Edit campaign: ${campaign.name}`);
  }

  deleteCampaign(campaign: any) {
    const confirmed = confirm(`Delete campaign: ${campaign.name}?`);
    if (confirmed) {
      this.campaigns = this.campaigns.filter(c => c !== campaign);
    }
  }
}
