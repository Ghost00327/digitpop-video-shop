import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../services/campaign.service';
import { Campaign } from '../models/campaign';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  campaign: Campaign;
  answers: any[];
  campaignId: any;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private router: Router
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as {campaignId: string};
    // this.campaignId = state.campaignId;
  }

  ngOnInit(): void {
    //this.getCampaign(this.campaignId);

    // this.route.data.subscribe((data) => {
    //   this.data = data;
    // });

    this.route.params.subscribe((params) => {
      this.campaignId = params['id'];

      this.getCampaign(this.campaignId);
    });
  }

  getCampaign(campaignId: string) {
    if (campaignId != null) {
      this.campaignService.getCampaign(campaignId).subscribe(
        (res) => {
          this.campaign = res as Campaign;
          this.buildAnswerArray();
        },
        (err) => {
          console.log('Error retrieving ad');
        }
      );
    }
  }

  buildAnswerArray() {
    var answerBuffer = [];
    answerBuffer.push(this.campaign.verificationWrongAnswer1);
    answerBuffer.push(this.campaign.verificationWrongAnswer2);
    answerBuffer.push(this.campaign.verificationWrongAnswer3);
    answerBuffer.push(this.campaign.verificationWrongAnswer4);
    answerBuffer.push(this.campaign.verificationAnswer);
    this.answers = this.shuffle(answerBuffer);
  }

  shuffle(array: any) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onAnswer(answer: any) {
    if (answer == this.campaign.verificationAnswer) {
      this.campaignService.verificationAnswer(answer).subscribe(
        (res) => {
          this.campaign = res as Campaign;
          this.buildAnswerArray();
        },
        (err) => {
          console.log('Error retrieving ad');
        }
      );

      var answerObj = new Object();

      // answer.engagementId = $rootScope.uiConfig.engagementId;
      // answer.campaignId = $rootScope.uiConfig.campaignId;
      // answer.answer = $scope.campaign.verificationAnswer;
    } else {
      //   var targetWindow = window.parent;
      //   alert("Incorrect Answer.  Tap screen to start again.");
      //   console.log('Incorrect Answer');
      //   console.log('$rootScope.uiConfig.projectId)', $rootScope.uiConfig.projectId);
      // console.log('$rootScope.uiConfig.engagementId)', $rootScope.uiConfig.engagementId);
      // console.log('$rootScope.uiConfig.campaignId)', $rootScope.uiConfig.campaignId);
      //   //$state.go('videoHome', { videoId: $rootScope.uiConfig.projectId, engagementId: $rootScope.uiConfig.engagementId, campaignId: $rootScope.uiConfig.campaignId });
      //   //targetWindow.postMessage('false', GLOBALS.homeUrl);
      //   $rootScope.$broadcast('play');
    }
  }
}
