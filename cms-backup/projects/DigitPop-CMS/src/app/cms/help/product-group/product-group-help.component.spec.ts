import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductGroupHelpComponent } from './product-group-help.component';

describe('ProductGroupHelpComponent', () => {
  let component: ProductGroupHelpComponent;
  let fixture: ComponentFixture<ProductGroupHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
