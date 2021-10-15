import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleHelpComponent } from './title-help.component';

describe('TitleHelpComponent', () => {
  let component: TitleHelpComponent;
  let fixture: ComponentFixture<TitleHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
