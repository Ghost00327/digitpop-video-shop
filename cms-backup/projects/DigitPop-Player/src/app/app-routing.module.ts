import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: 'ad/:id/preview/:preview',
    component: VideoComponent,
  },
  {
    path: 'ad/:id',
    component: VideoComponent,
  },
  {
    path: 'ad/:id/engagement/:engagementId/campaign/:campaignId',
    component: VideoComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
