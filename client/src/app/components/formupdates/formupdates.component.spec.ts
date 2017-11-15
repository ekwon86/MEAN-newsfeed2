import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormupdatesComponent } from './formupdates.component';

describe('FormupdatesComponent', () => {
  let component: FormupdatesComponent;
  let fixture: ComponentFixture<FormupdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormupdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
