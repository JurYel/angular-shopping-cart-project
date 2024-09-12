import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

<<<<<<< HEAD
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent]
    })
    .compileComponents();

=======
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent]
    });
>>>>>>> 69710467ebd1418fde7eb2fca79affb90d65e0b0
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
