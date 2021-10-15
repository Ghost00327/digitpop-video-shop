import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWizardHelpComponent } from './project-wizard-help.component';

describe('ProjectWizardHelpComponent', () => {
  let component: ProjectWizardHelpComponent;
  let fixture: ComponentFixture<ProjectWizardHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWizardHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWizardHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
