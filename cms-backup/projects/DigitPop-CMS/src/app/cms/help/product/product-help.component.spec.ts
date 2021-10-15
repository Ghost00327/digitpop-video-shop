import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHelpComponent } from './product-help.component';

describe('ProductHelpComponent', () => {
  let component: ProductHelpComponent;
  let fixture: ComponentFixture<ProductHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
