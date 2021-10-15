import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHelpComponent } from './projects-help.component';

describe('ProjectsHelpComponent', () => {
  let component: ProjectsHelpComponent;
  let fixture: ComponentFixture<ProjectsHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
