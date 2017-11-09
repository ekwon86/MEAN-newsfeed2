import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevUserComponent } from './dev-user.component';

describe('DevUserComponent', () => {
  let component: DevUserComponent;
  let fixture: ComponentFixture<DevUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
