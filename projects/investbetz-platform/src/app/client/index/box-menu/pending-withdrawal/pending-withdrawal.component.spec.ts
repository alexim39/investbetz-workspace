import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingWithdrawalComponent } from './pending-withdrawal.component';

describe('PendingWithdrawalComponent', () => {
  let component: PendingWithdrawalComponent;
  let fixture: ComponentFixture<PendingWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [PendingWithdrawalComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
