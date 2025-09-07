import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from '../../../services/AdsService';
import { Ads } from '../../../models/Ads';

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.less'] 
})
export class CreateAdsComponent {
  validateForm: FormGroup;
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private adsService: AdsService) {
    this.validateForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (file) {
      this.selectedImageFile = file;

    
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    if (this.validateForm.invalid || !this.selectedImageFile) {
      return;
    }

    const description = this.validateForm.value.description;
    const image = this.selectedImageFile;

    this.loading = true;
    this.adsService.createAd(description, image).subscribe({
      next: (res) => {
        console.log('✅ Ad created:', res);
        this.loading = false;

       
        this.validateForm.reset();
        this.imagePreviewUrl = null;
        this.selectedImageFile = null;
      },
      error: (err) => {
        console.error('❌ Error creating ad:', err);
        this.loading = false;
      }
    });
  }
}
