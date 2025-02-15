import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMsgComponent } from './read-msg.component';

describe('ReadMsgComponent', () => {
  let component: ReadMsgComponent;
  let fixture: ComponentFixture<ReadMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ReadMsgComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
