import { throwError as observableThrowError, timer } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RedemptionpopupComponent } from '../redemptionpopup/redemptionpopup.component';
import { FailurepopupComponent } from '../failurepopup/failurepopup.component';
import { XchaneAuthenticationService } from '../../shared/services/xchane-auth-service.service';
import { EngagementService } from '../../shared/services/engagement.service';
import { RedemptionService } from '../../shared/services/redemption.service';
import { XchaneUser } from '../../shared/models/xchane.user';
import { Redemption } from '../../shared/models/redemption';
import { Engagement } from '../../shared/models/engagement';
import { PlayerComponent } from '../player/player.component';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { ConfirmDialogComponent } from '../../cms/confirm-dialog/confirm-dialog.component';
import { CategoryService } from '../../shared/services/category.service';
import { WelcomeComponent } from '../help/welcome/welcome.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  iFrameSrc: string;
  popupDialogRef: MatDialogRef<PlayerComponent>;
  redemptionpopupDialogRef: MatDialogRef<RedemptionpopupComponent>;
  failurepopupDialogRef: MatDialogRef<FailurepopupComponent>;
  categories: any;
  error = '';

  constructor(
    public authService: XchaneAuthenticationService,
    public engagementService: EngagementService,
    public redemptionService: RedemptionService,
    public categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    console.log('In dashboard constructor');
    this.getCategories();
    //console.log("The current user role is : " + this.authService.currentUser.role);

    // if (this.authService.currentUser.role === 'admin') {
    //   this.showAdmin = true;
    // }
  }

  // Score Bubble Animation
  scoreBubbleIsOpen = false;
  showAdmin = false;

  public scoreBubbleToggle() {
    this.scoreBubbleIsOpen = !this.scoreBubbleIsOpen;

    if (this.scoreBubbleIsOpen) {
      const scoreBubbleTimer = timer(5000);
      scoreBubbleTimer.subscribe((x: any) => {
        this.scoreBubbleToggle();
      });
    } else {
      // NEED ANYTHING HERE?? ===================
      // If it was closed, remove the timer
      //clearTimeout(this.scoreBubbleTimer);
    }
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public onHelpClicked() {
    // PROVIDE A NEW HELP IMPLEMENTATION
    //this.shepherdService.start();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.filter((i: { active: boolean; }) => i.active == true);
      },
      (err: { ToString: () => string }) => {
        console.log('Error retrieving categories : ' + err.ToString());
      }
    );
  }

  private refreshUser() {
    this.authService
      .getXchaneUser(this.authService.currentUserValue._id)
      .subscribe(
        (data2) => {
          let use = new XchaneUser();
          use = data2 as XchaneUser;
          this.authService.storeUser(use);
        },
        (error: any) => {
          this.failurepopupDialogRef = this.dialog.open(FailurepopupComponent, {
            autoFocus: true,
            hasBackdrop: false,
            closeOnNavigation: true,
          });

          return observableThrowError(error);
        }
      );

    // this.authService.getCurrentXchaneUser().subscribe(
    //   (data2: XchaneUser) => {
    //     let use = new XchaneUser();
    //     use = data2 as XchaneUser;
    //     this.authService.storeUser(use);

    //     // if (this.authService.currentUser.role === 'admin') {
    //     //   this.showAdmin = true;
    //     // }
    //   },
    //   (error: any) => {
    //     this.failurepopupDialogRef = this.dialog.open(FailurepopupComponent, {
    //       autoFocus: true,
    //       hasBackdrop: false,
    //       closeOnNavigation: true,
    //     });

    //     return observableThrowError(error);
    //   }
    // );
  }

  public onClickMe(rewarder: string) {
    let redemption = new Redemption();
    redemption.rewarder = rewarder;
    //redemption.xchaneuser = this.authService.currentUser;
    this.redemptionService.requestRedemption(redemption).subscribe(
      () => {
        this.refreshUser();

        this.redemptionpopupDialogRef = this.dialog.open(
          RedemptionpopupComponent,
          {
            autoFocus: true,
            hasBackdrop: false,
            closeOnNavigation: true,
          }
        );
      },
      (error: any) => {
        this.failurepopupDialogRef = this.dialog.open(FailurepopupComponent, {
          autoFocus: true,
          hasBackdrop: false,
          closeOnNavigation: true,
        });

        return observableThrowError(error);
      }
    );

    console.log('onClickMe entered. Rewarder : ' + rewarder);
  }

  ngAfterViewInit() {
    this.welcome();
  }

  welcome() {
    if (!this.authService.currentUserValue.welcomed) {
      this.openWelcomeDialog();


    }
  }

  openWelcomeDialog(): void {

    const dialogRef = this.dialog.open(WelcomeComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');

      this.authService.welcome().subscribe(
        (res) => {
          this.authService.currentUserValue.welcomed = true;
        },
        (error) => {
          this.error = error;
        }
      );
    });
  }

  ngOnInit() {
    window.addEventListener('message', this.receiveMessage.bind(this), false);

    // Load component custom script
    this.loadScript('../../assets/js/app.main.scripts.js');


  }

  receiveMessage(event: any) {
    console.log('In dashboard, receiveMessage, received event : ' + event);

    if (
      event.data != null &&
      event.data.complete != null &&
      event.data.correct != null
    ) {
      this.popupDialogRef.close();

      if (event.data.correct) {
        this.scoreBubbleToggle();
        this.refreshUser();
      } else {
        const confirmDialog = this.dialog.open(AnswerDialogComponent, {
          data: {
            title: 'Incorrect Answer',
            message: 'Incorrect Answer, would you like to try again?',
          },
        });

        confirmDialog.afterClosed().subscribe((result) => {
          confirmDialog.close();

          if (result === true) {
            // Find a way to launch the previous video
            // this.onLaunchVideo();
          }
        });
      }
    }
  }

  onLaunchVideo(category: any) {
    this.engagementService
      .createEngagement(this.authService.currentUserValue, category)
      .subscribe(
        (data: any) => {
          // REFACTOR WITH NEW PLAYER
          this.iFrameSrc =
            `${environment.playerUrl}/ad/` +
            data.project +
            '/engagement/' +
            data._id +
            '/campaign/' +
            data.campaign;

          // Store current campaign?  May need if there is a retry

          this.popupDialogRef = this.dialog.open(PlayerComponent, {
            autoFocus: true,
            hasBackdrop: true,
            closeOnNavigation: false,
          });
          this.popupDialogRef.componentInstance.iFrameSrc = this.iFrameSrc;

          console.log('iFrameSrc :' + this.iFrameSrc);
          return true;
        },
        (error: any) => {
          const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'No ads currently available',
              message:
                'There are no additional ads at the moment. Try back later.',
            },
          });
          return observableThrowError(error);
        }
      );
  }
}
