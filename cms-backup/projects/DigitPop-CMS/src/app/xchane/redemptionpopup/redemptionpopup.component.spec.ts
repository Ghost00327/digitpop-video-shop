import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionpopupComponent } from './redemptionpopup.component';

describe('RedemptionpopupComponent', () => {
  let component: RedemptionpopupComponent;
  let fixture: ComponentFixture<RedemptionpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemptionpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
