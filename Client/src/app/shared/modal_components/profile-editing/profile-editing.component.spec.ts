import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditingComponent } from './profile-editing.component';

describe('ProfileEditingComponent', () => {
  let component: ProfileEditingComponent;
  let fixture: ComponentFixture<ProfileEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
