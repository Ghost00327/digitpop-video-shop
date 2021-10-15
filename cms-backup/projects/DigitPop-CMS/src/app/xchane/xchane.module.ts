import { NgModule, InjectionToken } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FailurepopupComponent } from './failurepopup/failurepopup.component';
import { RedemptionpopupComponent } from './redemptionpopup/redemptionpopup.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { PlayerComponent } from './player/player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { GuidedTourModule } from 'ngx-guided-tour';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './help/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'preview',
    component: PlayerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
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
  ],
  exports: [RouterModule],
  declarations: [
    PlayerComponent,
    DashboardComponent,
    FailurepopupComponent,
    RedemptionpopupComponent,
    LandingComponent,
    SignupComponent,
    LoginComponent,
    AnswerDialogComponent,
    WelcomeComponent,
  ],
  providers: [],
})
export class XchaneModule {
  constructor() {
    localStorage.removeItem('XchaneCurrentUser');
    // localStorage.removeItem('currentuser');
  }
}
