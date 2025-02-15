import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialGrowthComponent } from './financial-growth.component';

describe('FinancialGrowthComponent', () => {
  let component: FinancialGrowthComponent;
  let fixture: ComponentFixture<FinancialGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [FinancialGrowthComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
