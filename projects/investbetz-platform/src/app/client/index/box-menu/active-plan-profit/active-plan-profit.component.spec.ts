import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlanProfitComponent } from './active-plan-profit.component';

describe('ActivePlanProfitComponent', () => {
  let component: ActivePlanProfitComponent;
  let fixture: ComponentFixture<ActivePlanProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ActivePlanProfitComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlanProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
