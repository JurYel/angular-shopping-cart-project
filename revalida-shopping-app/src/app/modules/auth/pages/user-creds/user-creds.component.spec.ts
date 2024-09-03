import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCredsComponent } from './user-creds.component';

describe('UserCredsComponent', () => {
  let component: UserCredsComponent;
  let fixture: ComponentFixture<UserCredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCredsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
