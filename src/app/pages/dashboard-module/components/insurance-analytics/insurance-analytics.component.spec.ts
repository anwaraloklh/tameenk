import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAnalyticsComponent } from './insurance-analytics.component';

describe('InsuranceAnalyticsComponent', () => {
  let component: InsuranceAnalyticsComponent;
  let fixture: ComponentFixture<InsuranceAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
