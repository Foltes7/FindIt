import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullThingComponent } from './full-thing.component';

describe('FullThingComponent', () => {
  let component: FullThingComponent;
  let fixture: ComponentFixture<FullThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullThingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
