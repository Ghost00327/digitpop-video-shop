import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FileValidatorUtil } from '../../shared/utility/FileValidator';
import { MatDialog } from '@angular/material/dialog';
import { CampaignTitleComponent } from '../help/campaign-title/campaign-title.component';
import { ProjectService } from '../../shared/services/project.service';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../shared/services/category.service';
import { CampaignService } from '../../shared/services/campaign.service';
import { Router } from '@angular/router';
import { Project } from '../../shared/models/project';
import { Campaign } from '../../shared/models/campaign';

@Component({
  selector: 'DigitPop-campaign-wizard',
  templateUrl: './campaign-wizard.component.html',
  styleUrls: ['./campaign-wizard.component.scss'],
})
export class CampaignWizardComponent implements OnInit {
  campaignFormGroup: FormGroup;
  projects: any;
  categories: any;
  campaign: Campaign;
  editFlag = false;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private campaignService: CampaignService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    console.log('Campaign Wizard!');

    this.getProjects();
    this.getCategories();

    // Logic to determine if we're editing an existing project or creating a new one
    var nav = this.router.getCurrentNavigation();

    if (
      nav != null &&
      nav.extras != null &&
      nav.extras.state != null &&
      nav.extras.state.campaign != null
    ) {
      this.campaign = this.router.getCurrentNavigation().extras.state.campaign;
      this.editFlag = true;
    } else {
      this.campaign = new Campaign();
    }
  }

  ngOnInit(): void {
    this.campaignFormGroup = new FormGroup({
      title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      project: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      category: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      budgetAmount: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      startDate: new FormControl(new Date(), {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      endDate: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationQuestion: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationAnswer: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationWrongAnswer1: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationWrongAnswer2: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationWrongAnswer3: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      verificationWrongAnswer4: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
    });

    this.campaignFormGroup.get('title').valueChanges.subscribe(() => {
      this.campaign.name = this.campaignFormGroup.get('title').value;
      this.updateCampaign();
    });

    this.campaignFormGroup.get('project').valueChanges.subscribe(() => {
      this.campaign.project = this.campaignFormGroup.get('project').value;
      this.updateCampaign();
    });

    this.campaignFormGroup.get('category').valueChanges.subscribe(() => {
      this.campaign.category = this.campaignFormGroup.get('category').value;
      this.updateCampaign();
    });

    this.campaignFormGroup.get('budgetAmount').valueChanges.subscribe(() => {
      this.campaign.budgetAmount = this.campaignFormGroup.get(
        'budgetAmount'
      ).value;
      this.updateCampaign();
    });

    this.campaignFormGroup.get('startDate').valueChanges.subscribe(() => {
      this.campaign.startDate = this.campaignFormGroup.get('startDate').value;
      this.updateCampaign();
    });

    this.campaignFormGroup.get('endDate').valueChanges.subscribe(() => {
      this.campaign.endDate = this.campaignFormGroup.get('endDate').value;
      this.updateCampaign();
    });

    this.campaignFormGroup
      .get('verificationQuestion')
      .valueChanges.subscribe(() => {
        this.campaign.verificationQuestion = this.campaignFormGroup.get(
          'verificationQuestion'
        ).value;
        this.updateCampaign();
      });

    this.campaignFormGroup
      .get('verificationAnswer')
      .valueChanges.subscribe(() => {
        this.campaign.verificationAnswer = this.campaignFormGroup.get(
          'verificationAnswer'
        ).value;
        this.updateCampaign();
      });

    this.campaignFormGroup
      .get('verificationWrongAnswer1')
      .valueChanges.subscribe(() => {
        this.campaign.verificationWrongAnswer1 = this.campaignFormGroup.get(
          'verificationWrongAnswer1'
        ).value;
        this.updateCampaign();
      });

    this.campaignFormGroup
      .get('verificationWrongAnswer2')
      .valueChanges.subscribe(() => {
        this.campaign.verificationWrongAnswer2 = this.campaignFormGroup.get(
          'verificationWrongAnswer2'
        ).value;
        this.updateCampaign();
      });

    this.campaignFormGroup
      .get('verificationWrongAnswer3')
      .valueChanges.subscribe(() => {
        this.campaign.verificationWrongAnswer3 = this.campaignFormGroup.get(
          'verificationWrongAnswer3'
        ).value;
        this.updateCampaign();
      });

    this.campaignFormGroup
      .get('verificationWrongAnswer4')
      .valueChanges.subscribe(() => {
        this.campaign.verificationWrongAnswer4 = this.campaignFormGroup.get(
          'verificationWrongAnswer4'
        ).value;
        this.updateCampaign();
      });

    if (this.editFlag) {
      this.campaignFormGroup
        .get('title')
        .setValue(this.campaign.name, { emitEvent: false });
      this.campaignFormGroup
        .get('project')
        .setValue(this.campaign.project._id, { emitEvent: false });
      this.campaignFormGroup
        .get('category')
        .setValue(this.campaign.category, { emitEvent: false });
      this.campaignFormGroup
        .get('budgetAmount')
        .setValue(this.campaign.budgetAmount, { emitEvent: false });
      // this.campaignFormGroup
      //   .get('description')
      //   .setValue(this.campaign.description, { emitEvent: false });
      this.campaignFormGroup
        .get('startDate')
        .setValue(this.campaign.startDate, { emitEvent: false });
      this.campaignFormGroup
        .get('endDate')
        .setValue(this.campaign.endDate, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationQuestion')
        .setValue(this.campaign.verificationQuestion, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationAnswer')
        .setValue(this.campaign.verificationAnswer, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationWrongAnswer1')
        .setValue(this.campaign.verificationWrongAnswer1, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationWrongAnswer2')
        .setValue(this.campaign.verificationWrongAnswer2, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationWrongAnswer3')
        .setValue(this.campaign.verificationWrongAnswer3, { emitEvent: false });
      this.campaignFormGroup
        .get('verificationWrongAnswer4')
        .setValue(this.campaign.verificationWrongAnswer4, { emitEvent: false });
    } else {
      this.createNewCampaign();
    }
  }

  createNewCampaign() {
    this.campaignService.addCampaign(this.campaign).subscribe(
      (res) => {
        this.campaign._id = res._id;
        console.log('Subscribed response : ' + res.toString());
      },
      (err) => {
        console.log('Error : ' + err);
      }
    );
  }

  updateCampaign() {
    this.campaignService.updateCampaign(this.campaign).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err: { ToString: () => string }) => {
        console.log('Error retrieving categories : ' + err.ToString());
      }
    );
  }

  getProjects() {
    this.projectService.getProjects$().subscribe(
      (res: any) => {
        this.projects = res;
      },
      (err: { ToString: () => string }) => {
        console.log('Error retrieving categories : ' + err.ToString());
      }
    );

    // this.projectService.getMyProjects().subscribe(
    //   (res: any) => {
    //     this.projects = res;
    //   },
    //   (err: { ToString: () => string }) => {
    //     console.log('Error retrieving categories : ' + err.ToString());
    //   }
    // );
  }

  onSubmitCampaign() {
    this.campaignService.addCampaign(this.campaign).subscribe(
      (res) => {
        console.log('Subscribed response : ' + res.toString());
      },
      (err) => {
        console.log('Error : ' + err);
      }
    );
  }

  onTitleHelp(): void {
    const dialogRef = this.dialog.open(CampaignTitleComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
