import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { AuthenticationService } from '../../shared/services/auth-service.service';
import { BillsbyService } from '../../shared/services/billsby.service';
import { ImageService } from '../../shared/services/image.service';
import { AccountHelpComponent } from '../help/account/account-help.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'DigitPop-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  cid: any;
  sid: any;
  subscription: any;
  usage: any;
  icon:any;
  uploadStatus: any;
  currentUser: User;

  @ViewChild('fileInput')
  fileInput: { nativeElement: { click: () => void; files: { [key: string]: File; }; }; };

  file: File | null = null;

  constructor(
    private authService: AuthenticationService,
    private billsByService: BillsbyService,
    private imageService: ImageService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

  }

  ngOnInit(): void {
    this.getSubscription();
  }

  onSubmitThumbnail() {
    this.imageService
      .upload(this.file)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              return (this.uploadStatus = Math.round(
                (100 * event.loaded) / event.total
              ));

            case HttpEventType.Response:
              this.currentUser.icon = event.body;
              this.updateUser();
              return true;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      )
      .subscribe(
        (res) => {
          console.log('Response log : ' + res);
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  updateUser() {
    this.authService.updateUser(this.currentUser).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.onSubmitThumbnail();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  getCid(): string {
    return this.authService.currentUserValue.cid;
  }

  getSid(): string {
    return this.authService.currentUserValue.sid;
  }

  getSubscription() {
    this.billsByService.getSubscriptionDetails().subscribe(
      (res) => {
        this.subscription = res;
        this.getUsage();
        console.log('Update response : ' + res.toString());
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  accountHelp() {
    const dialogRef = this.dialog.open(AccountHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  getUsage() {
    this.authService
      .getUsage(this.authService.currentUserValue, this.subscription.cycleId)
      .subscribe(
        (res) => {
          this.usage = this.formatBytes(res);
          console.log('Update response : ' + res.toString());
        },
        (err) => {
          console.log('Update error : ' + err.toString());
        }
      );
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  cancelSubscription() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cancel Subscription',
        message: 'Are you sure you want to cancel your subscription?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        //this.billsByService.cancelSubscription();

        this.billsByService.cancelSubscription().subscribe(
          (res) => {
            this.logout();
          },
          (err) => {
            console.log('Update error : ' + err.toString());
          }
        );
      }
    });
  }

  pauseSubscription() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Pause Subscription',
        message:
          'Are you sure you want to pause your subscription for one cycle?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        //this.billsByService.cancelSubscription();

        this.billsByService.pauseSubscription().subscribe(
          (res) => {
            console.log('Pause subscription response : ' + res.toString());
          },
          (err) => {
            console.log('Update error : ' + err.toString());
          }
        );
      }
    });
  }
}
