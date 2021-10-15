import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHelpComponent } from './main-help.component';

describe('MainHelpComponent', () => {
  let component: MainHelpComponent;
  let fixture: ComponentFixture<MainHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
