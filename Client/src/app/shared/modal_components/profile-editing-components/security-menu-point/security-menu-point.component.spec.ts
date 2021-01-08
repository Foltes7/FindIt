import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMenuPointComponent } from './security-menu-point.component';

describe('SecurityMenuPointComponent', () => {
  let component: SecurityMenuPointComponent;
  let fixture: ComponentFixture<SecurityMenuPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityMenuPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityMenuPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
