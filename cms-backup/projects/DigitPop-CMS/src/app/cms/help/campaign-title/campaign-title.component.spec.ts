import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTitleComponent } from './campaign-title.component';

describe('CampaignTitleComponent', () => {
  let component: CampaignTitleComponent;
  let fixture: ComponentFixture<CampaignTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
