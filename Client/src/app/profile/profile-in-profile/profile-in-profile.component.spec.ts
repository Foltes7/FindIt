import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInProfileComponent } from './profile-in-profile.component';

describe('ProfileInProfileComponent', () => {
  let component: ProfileInProfileComponent;
  let fixture: ComponentFixture<ProfileInProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
