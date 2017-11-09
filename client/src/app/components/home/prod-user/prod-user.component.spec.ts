import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdUserComponent } from './prod-user.component';

describe('ProdUserComponent', () => {
  let component: ProdUserComponent;
  let fixture: ComponentFixture<ProdUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
