import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuPointComponent } from './profile-menu-point.component';

describe('ProfileMenuPointComponent', () => {
  let component: ProfileMenuPointComponent;
  let fixture: ComponentFixture<ProfileMenuPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMenuPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
