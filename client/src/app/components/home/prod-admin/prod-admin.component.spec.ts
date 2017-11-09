import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAdminComponent } from './prod-admin.component';

describe('ProdAdminComponent', () => {
  let component: ProdAdminComponent;
  let fixture: ComponentFixture<ProdAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
