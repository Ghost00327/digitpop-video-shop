import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailHelpComponent } from './thumbnail-help.component';

describe('ThumbnailHelpComponent', () => {
  let component: ThumbnailHelpComponent;
  let fixture: ComponentFixture<ThumbnailHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
