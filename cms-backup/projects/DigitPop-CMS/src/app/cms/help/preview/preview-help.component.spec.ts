import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewHelpComponent } from './preview-help.component';

describe('PreviewHelpComponent', () => {
  let component: PreviewHelpComponent;
  let fixture: ComponentFixture<PreviewHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
