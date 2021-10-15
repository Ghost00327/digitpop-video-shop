import { NgModule, InjectionToken } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProjectWizardComponent } from './project-wizard/project-wizard.component';
import { PreviewComponent } from './preview/preview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { GuidedTourModule } from 'ngx-guided-tour';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { PreviewHelpComponent } from './help/preview/preview-help.component';
import { AccountHelpComponent } from './help/account/account-help.component';
import { ProductHelpComponent } from './help/product/product-help.component';
import { ProductGroupHelpComponent } from './help/product-group/product-group-help.component';
import { ProductGroupsHelpComponent } from './help/product-groups/product-groups-help.component';
import { ProjectsHelpComponent } from './help/projects/projects-help.component';
import { ProjectWizardHelpComponent } from './help/project/project-wizard-help.component';
import { ThumbnailHelpComponent } from './help/thumbnail/thumbnail-help.component';
import { TitleHelpComponent } from './help/title/title-help.component';
import { VideoHelpComponent } from './help/video/video-help.component';
import { WelcomeComponent } from './help/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../shared/pipes/SafePipe';
import { RouterModule, Routes } from '@angular/router';
import { FailurepopupComponent } from '../xchane/failurepopup/failurepopup.component';
import { RedemptionpopupComponent } from '../xchane/redemptionpopup/redemptionpopup.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CampaignWizardComponent } from './campaign-wizard/campaign-wizard.component';
import { CampaignTitleComponent } from './help/campaign-title/campaign-title.component';
import { provideTokenizedHttpClient } from '../shared/helpers/provider.config';
import { JwtInterceptor } from './services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BillsbyInterceptor } from './services/billsby.interceptor';
import { ErrorInterceptor } from '../shared/interceptors/error.interceptor';
import { CustomHttpInterceptor } from '../shared/interceptors/http.interceptor';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campaign-wizard',
    component: CampaignWizardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project-wizard',
    component: ProjectWizardComponent,
    canActivate: [AuthGuard],
  },
];

export const HTTP_NOAUTH = new InjectionToken('http_noauth');
export const HTTP_NOBILLS = new InjectionToken('http_nobills');

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatStepperModule,
    MaterialFileInputModule,
    MatProgressBarModule,
    MatSelectModule,
    TableVirtualScrollModule,
    GuidedTourModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    DashboardComponent,
    AccountComponent,
    CampaignsComponent,
    ConfirmDialogComponent,
    PreviewComponent,
    ProjectWizardComponent,
    PreviewHelpComponent,
    AccountHelpComponent,
    ProductHelpComponent,
    ProductGroupHelpComponent,
    ProductGroupsHelpComponent,
    ProjectsHelpComponent,
    ProjectWizardHelpComponent,
    ThumbnailHelpComponent,
    TitleHelpComponent,
    VideoHelpComponent,
    WelcomeComponent,
    CampaignWizardComponent,
    CampaignTitleComponent
  ],
  exports: [RouterModule],
  providers: [
    provideTokenizedHttpClient(HTTP_NOAUTH, { excludes: [JwtInterceptor] }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BillsbyInterceptor,
      multi: true,
    },
    provideTokenizedHttpClient(HTTP_NOBILLS, {
      excludes: [BillsbyInterceptor],
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    }
  ]
})

export class CMSModule {

  constructor()
  {
    localStorage.removeItem('XchaneCurrentUser');
    // localStorage.removeItem('currentuser');
  }
}
