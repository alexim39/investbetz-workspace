import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoWithdrawComponent } from './auto-withdraw.component';

describe('AutoWithdrawComponent', () => {
  let component: AutoWithdrawComponent;
  let fixture: ComponentFixture<AutoWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [AutoWithdrawComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
