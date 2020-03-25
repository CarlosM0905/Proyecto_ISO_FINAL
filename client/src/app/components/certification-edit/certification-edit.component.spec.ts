import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationEditComponent } from './certification-edit.component';

describe('CertificationEditComponent', () => {
  let component: CertificationEditComponent;
  let fixture: ComponentFixture<CertificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
