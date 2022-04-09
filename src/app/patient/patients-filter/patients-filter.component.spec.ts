import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsFilterComponent } from './patients-filter.component';

describe('PatientsFilterComponent', () => {
  let component: PatientsFilterComponent;
  let fixture: ComponentFixture<PatientsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
