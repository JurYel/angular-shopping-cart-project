import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingordersComponent } from './pendingorders.component';

describe('PendingordersComponent', () => {
  let component: PendingordersComponent;
  let fixture: ComponentFixture<PendingordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingordersComponent]
    });
    fixture = TestBed.createComponent(PendingordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
