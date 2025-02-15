import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMsgComponent } from './new-msg.component';

describe('NewMsgComponent', () => {
  let component: NewMsgComponent;
  let fixture: ComponentFixture<NewMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [NewMsgComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
