import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { QuizComponent } from './quiz/quiz.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PreviewComponent } from './preview/preview.component';
import { MatCardModule } from '@angular/material/card';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { MainHelpComponent } from './help/main-help/main-help.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SafePipe } from './video/utilities/SafePipe';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    VideoComponent,
    ImageCarouselComponent,
    QuizComponent,
    PreviewComponent,
    MainHelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxImageZoomModule,
    MatGridListModule,
    MatCardModule,
    ScrollingModule,
    CdkScrollableModule,
    MatStepperModule,
    PlatformModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PreviewComponent]
})
export class AppModule { }
