import { ComponentFixture, TestBed } from '@angular/core/testing';

import { 401Component } from './401.component';

describe('401Component', () => {
  let component: 401Component;
  let fixture: ComponentFixture<401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [401Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
