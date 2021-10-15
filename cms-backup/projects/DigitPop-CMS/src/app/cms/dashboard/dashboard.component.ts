import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay, first } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../shared/models/project';
import { ProductGroup } from '../../shared/models/productGroup';
import { BillsbyService } from '../../shared/services/billsby.service';
import { CampaignService } from '../../shared/services/campaign.service';
import { ProjectService } from '../../shared/services/project.service';
import { AuthenticationService } from '../../shared/services/auth-service.service';
import { WelcomeComponent } from '../help/welcome/welcome.component';
import { ProjectsHelpComponent } from '../help/projects/projects-help.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Campaign } from '../../shared/models/campaign';

@Component({
  selector: 'DigitPop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('pgDetailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'thumbnail',
    'name',
    'watchCount',
    'pauseCount',
    'clickCount',
    'buyNowCount',
    'active',
    'createdAt',
    'updatedAt',
    'edit',
  ];

  displayedColumns2: string[] = [
    'name',
    'project',
    'completionCount',
    'engagementCount',
    'impressionCount',
    'budgetAmount',
    'active',
    'campaignEdit',
  ];

  //displayedColumns2: string[] = ['cname', 'position', 'weight', 'symbol'];

  innerDisplayedColumns: string[] = ['title', 'pauseCount', 'clickCount'];
  innerProductDisplayedColumns: string[] = [
    'thumbnail',
    'productName',
    'productClickCount',
    'clickBuyNowCount',
  ];
  dataSource: any;
  campaignsDataSource: any;
  error = '';
  cid: any;
  width: any;
  height: any;
  expandedElement: Project | null;
  expandedProductGroupElement: ProductGroup | null;
  color: ThemePalette = 'primary';

  constructor(
    private route: ActivatedRoute,
    private billsbyService: BillsbyService,
    private campaignService: CampaignService,
    private breakpointObserver: BreakpointObserver,
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.height = 25;
    this.width = 150;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  openWelcomeDialog(): void {
    const dialogRef = this.dialog.open(WelcomeComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  welcome() {
    if (!this.authService.currentUserValue.welcomed) {
      this.openWelcomeDialog();

      this.authService.welcome().subscribe(
        (res) => {
          this.authService.currentUserValue.welcomed = true;
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }

  ngOnInit() {
    //console.log("Billsby URL : " + `${environment.billsbyUrl}`);

    this.campaignService
      .getMyCampaigns()
      .pipe(first())
      .subscribe(
        (campaigns) => {
          this.campaignsDataSource = new MatTableDataSource<Campaign>(
            campaigns
          );
        },
        (error) => {
          this.error = error;
        }
      );

    // this.projectService
    // .getMyProjects()
    // .pipe(first())
    // .subscribe(

    this.projectService.getProjects$().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item: any, property: any) => {
          switch (property) {
            case 'watchCount':
              return item.stats.videoWatchCount;
            case 'pauseCount':
              return item.stats.videoPauseCount;
            case 'clickCount':
              return item.stats.clickCount;
            case 'buyNowCount':
              return item.stats.buyNowClickCount;

            default:
              return item[property];
          }
        };
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.error = error;
      }
    );

    // this.projectService
    //   .getMyProjects()
    //   .subscribe(
    //     (res:any) => {
    //       this.dataSource = new MatTableDataSource(res);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sortingDataAccessor = (item: any, property: any) => {
    //         switch (property) {
    //           case 'watchCount':
    //             return item.stats.videoWatchCount;
    //           case 'pauseCount':
    //             return item.stats.videoPauseCount;
    //           case 'clickCount':
    //             return item.stats.clickCount;
    //           case 'buyNowCount':
    //             return item.stats.buyNowClickCount;

    //           default:
    //             return item[property];
    //         }
    //       };
    //       this.dataSource.sort = this.sort;
    //     },
    //     (error) => {
    //       this.error = error;
    //     }
    //   );

    this.welcome();
  }

  projectsHelp() {
    const dialogRef = this.dialog.open(ProjectsHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  campaignsHelp() {
    // const dialogRef = this.dialog.open(ProjectsHelpComponent, {
    //   width: '100%',
    //   height: '90%',
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('The dialog was closed');
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCampaignsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.campaignsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.campaignsDataSource.paginator) {
      this.campaignsDataSource.paginator.firstPage();
    }
  }

  launchProjectWizard() {
    this.router.navigate(['/cms/project-wizard']);
  }

  launchCampaignsWizard() {
    this.router.navigate(['/cms/campaign-wizard']);
  }

  onEdit(project: Project) {
    const navigationExtras: NavigationExtras = {
      state: { project: project },
    };
    this.router.navigate(['/cms/project-wizard'], navigationExtras);
  }

  onCampaignEdit(campaign: Campaign) {
    const navigationExtras: NavigationExtras = {
      state: { campaign: campaign },
    };
    this.router.navigate(['/cms/campaign-wizard'], navigationExtras);
  }

  updateCampaignFunc(element: Campaign, e: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Change Status',
        message: 'Are you sure you want to change the status of the campaign?',
      },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        element.active = !element.active;
        this.campaignService.updateCampaign(element).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        e.source.checked = element.active;
        console.log('toggle should not change if I click the cancel button');
      }
    });
  }

  updateFunc(element: Project, e: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Change Status',
        message: 'Are you sure you want to change the status of the project?',
      },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        element.active = !element.active;
        this.projectService.updateProject(element).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        e.source.checked = element.active;
        console.log('toggle should not change if I click the cancel button');
      }
    });
  }
}
