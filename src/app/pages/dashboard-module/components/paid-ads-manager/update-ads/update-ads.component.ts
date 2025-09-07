import { Component, Inject } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { AdsService } from '../../../services/AdsService';


@Component({
  selector: 'app-update-ads',
  templateUrl: './update-ads.component.html',
  styleUrls: ['./update-ads.component.less']
})
export class UpdateAdsComponent {

  adId!: number;
  currentImageUrl!: string;
  selectedImageFile!: File;
  imagePreviewUrl!: string | ArrayBuffer | null;

  constructor(
    private modalRef: NzModalRef,
    private adsService: AdsService,
    @Inject(NZ_MODAL_DATA) public data: { adId: number; currentImageUrl: string }
  ) {
    this.adId = data.adId;
    this.currentImageUrl = data.currentImageUrl;
    this.imagePreviewUrl = this.currentImageUrl;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  updateImage(): void {
    if (!this.selectedImageFile) {
      console.error('No image selected');
      return;
    }

    this.adsService.updateAdImage(this.adId, this.selectedImageFile).subscribe({
      next: () => {
        console.log('Image updated successfully');
        this.modalRef.close(true);
      },
      error: (err) => {
        console.error('Error updating image', err);
      }
    });
  }

  cancel(): void {
    this.modalRef.close(false);
  }
}
