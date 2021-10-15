import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignWizardComponent } from './campaign-wizard.component';

describe('CampaignWizardComponent', () => {
  let component: CampaignWizardComponent;
  let fixture: ComponentFixture<CampaignWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
