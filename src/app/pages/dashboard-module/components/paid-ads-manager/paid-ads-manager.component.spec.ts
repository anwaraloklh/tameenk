import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidAdsManagerComponent } from './paid-ads-manager.component';

describe('PaidAdsManagerComponent', () => {
  let component: PaidAdsManagerComponent;
  let fixture: ComponentFixture<PaidAdsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidAdsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidAdsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
