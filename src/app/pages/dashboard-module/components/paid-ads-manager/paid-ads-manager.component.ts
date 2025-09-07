import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../services/AdsService';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Ads } from '../../models/Ads';
import { CreateAdsComponent } from './create-ads/create-ads.component';
import { UpdateAdsComponent } from './update-ads/update-ads.component';

@Component({
  selector: 'app-paid-ads-manager',
  templateUrl: './paid-ads-manager.component.html',
  styleUrls: ['./paid-ads-manager.component.less']
})
export class PaidAdsManagerComponent implements OnInit {
  ads: Ads[] = [];
  loading = false;

  currentImage: string | null = null;


  constructor(private adsService: AdsService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.loading = true;
    this.adsService.getAllAds().subscribe({
      next: (res) => {
        this.ads = res.data.map((ad: Ads) => {
        
          return {
            ...ad,
            image: ad.image ? `https://taaminak.tahamove.com/storage/${ad.image}` : ''
          };
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading ads:', err);
        this.loading = false;
      }
    });
  }
  
  openCreateModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Create Ad',
      nzContent: CreateAdsComponent,
      nzFooter: null,
    });

    modalRef.afterClose.subscribe(result => {
      if (result === true) {
        this.loadAds();
      }
    });
  }

  openUpdateModal(ad: Ads): void {
    const modalRef = this.modal.create({
      nzTitle: 'Update Ad Image',
      nzContent: UpdateAdsComponent,
      nzData: {
        adId: ad.id,              
        currentImageUrl: ad.image  
      },
      nzFooter: null
    });

    modalRef.afterClose.subscribe(result => {
      if (result === true) {
        this.loadAds();
      }
    });
  }
  


  confirmDelete(adId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this ad?',
      nzOkText: 'Yes',

      nzOnOk: () => this.deleteAd(adId),
      nzCancelText: 'No'
    });
  }

  deleteAd(adId: number): void {
    this.loading = true;
    this.adsService.deleteAd(adId).subscribe({
      next: () => {
       
        this.loadAds();
      },
      error: (err) => {
        console.error('Error deleting ad:', err);
        this.loading = false;
      }
    });
  }
  

}
