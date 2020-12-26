import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTitleComponent } from './modal-title.component';

describe('ModalTitleComponent', () => {
  let component: ModalTitleComponent;
  let fixture: ComponentFixture<ModalTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
