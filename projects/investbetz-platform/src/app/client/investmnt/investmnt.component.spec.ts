import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmntComponent } from './investmnt.component';

describe('InvestmntComponent', () => {
  let component: InvestmntComponent;
  let fixture: ComponentFixture<InvestmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [InvestmntComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
