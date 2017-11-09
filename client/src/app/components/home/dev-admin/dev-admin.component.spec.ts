import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevAdminComponent } from './dev-admin.component';

describe('DevAdminComponent', () => {
  let component: DevAdminComponent;
  let fixture: ComponentFixture<DevAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
