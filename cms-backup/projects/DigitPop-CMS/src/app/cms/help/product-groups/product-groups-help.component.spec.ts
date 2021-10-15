import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsHelpComponent } from './product-groups-help.component';

describe('ProductGroupsHelpComponent', () => {
  let component: ProductGroupsHelpComponent;
  let fixture: ComponentFixture<ProductGroupsHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupsHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
