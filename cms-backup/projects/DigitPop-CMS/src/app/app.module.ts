import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalErrorHandlerService } from './globalErrorHandlerService';
import { MatStepperModule } from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomHttpInterceptor } from './shared/interceptors/http.interceptor';
import { provideTokenizedHttpClient } from './shared/helpers/provider.config';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SafePipe } from './shared/pipes/SafePipe';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP_NOAUTH, HTTP_NOBILLS } from './cms/cms.module';
import { JwtInterceptor } from './cms/services/jwt.interceptor';
import { BillsbyInterceptor } from './cms/services/billsby.interceptor';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    SharedModule,
    HttpClientModule,
    MatRadioModule,
  ],
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
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
