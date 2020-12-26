import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignINComponent } from './sign-in.component';

describe('SignINComponent', () => {
  let component: SignINComponent;
  let fixture: ComponentFixture<SignINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignINComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
