import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ViewContainerRef,
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  NavigationExtras,
} from '@angular/router';
import { Project } from '../models/project';
import { AdService } from '../services/ad.service';
import { ProductGroup } from 'projects/DigitPop-CMS/src/app/models/productGroup';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'projects/DigitPop-CMS/src/app/models/product';
import { ImageService } from 'projects/DigitPop-CMS/src/app/services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { TestBed } from '@angular/core/testing';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MainHelpComponent } from '../help/main-help/main-help.component';
import { UserService } from '../services/user.service';
import { BillsbyService } from '../services/billsby.service';
import { environment } from '../../environments/environment';
import { Subscription, timer } from 'rxjs';
import { SubscriptionInfo, SubscriptionDetails } from '../models/subscription';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, AfterViewInit {
  adId: any;
  engagementId: any;
  campaignId: any;
  ad: Project;
  currentProductGroup: ProductGroup;
  currentProduct: Product;
  selectedImage: any;
  innerWidth: any;
  innerHeight: any;
  viewState: any;
  subscription: any;
  showVideo = false;
  adReady = false;
  showThumbnail = false;
  showCanvas = false;
  showBackToGroup = false;
  disablePrevious = true;
  disableNext = true;
  preview = false;
  params: Params;
  pgIndex: any;
  test = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adService: AdService,
    private userService: UserService,
    private billsByService: BillsbyService
  ) {
    console.log('In constructor');
  }

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.route.params.subscribe((params) => {
      this.params = params;
      this.adId = params['id'];

      if (params['engagementId'] != null && params['campaignId']) {
        this.engagementId = params['engagementId'];
        this.campaignId = params['campaignId'];
      }

      console.log('About to evaluate preview param....');
      if (params['preview'] != null) {
        console.log('Found preview param : ' + params['preview']);
        this.preview = params['preview'];
      }
    });

    console.log('Ad id is : ' + this.adId);

    if (this.adId != null) {
      this.adService.getAd(this.adId).subscribe(
        (res) => {
          this.ad = res as Project;

          if (this.ad.active || this.preview) {
            this.adReady = true;
            this.showThumbnail = true;
            this.userService.setTitle(this.ad.name);

            this.userService.getUserSubscription(this.ad.createdBy).subscribe(
              (res) => {
                var result = res as SubscriptionInfo;

                this.billsByService
                  .getSubscriptionDetails(result.sid)
                  .subscribe(
                    (res) => {
                      this.subscription = res as SubscriptionDetails;

                      this.userService.getUserIcon(this.ad.createdBy).subscribe(
                        (res) => {
                          this.userService.setUserIcon(res);
                        },
                        (err) => {
                          console.log('Error retrieving user icon');
                        }
                      );
                    },
                    (err) => {
                      console.log('Error retrieving subscription details');
                    }
                  );
              },
              (err) => {
                console.log('Error retrieving subscription info');
              }
            );
          }
        },
        (err) => {
          console.log('Error retrieving ad');
        }
      );
    }
  }

  help() {
    const dialogRef = this.dialog.open(MainHelpComponent, {
      hasBackdrop: true,
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  ngAfterViewInit() {
    //this.setSize();
    this.videoPlayer.nativeElement.height = this.innerHeight;
    this.videoPlayer.nativeElement.width = this.innerWidth;
    if (this.videoPlayer.nativeElement.requestFullscreen) {
      this.videoPlayer.nativeElement.requestFullscreen();
    } else if (this.videoPlayer.nativeElement.msRequestFullscreen) {
      this.videoPlayer.nativeElement.msRequestFullscreen();
    } else if (this.videoPlayer.nativeElement.webkitRequestFullscreen) {
      this.videoPlayer.nativeElement.webkitRequestFullscreen();
    }
  }

  getAd(id: any) {
    this.adService.getAd(this.adId).subscribe(
      (res) => {
        this.ad = res as Project;
      },
      (err) => {
        console.log('Error retrieving ad');
      }
    );
  }

  testMultipleProductGroups() {
    // for (let i = 0; i < 10; i++) {
    //   var test = this.ad.productGroupTimeLine[0].products[0];
    //   test.description =
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis nulla, pellentesque id justo pharetra, mollis sollicitudin lorem. Pellentesque auctor arcu mi, non mattis risus luctus in. Nunc vitae hendrerit urna. Nullam lacus turpis, lacinia ac fringilla vitae, tempus quis sapien. Proin in bibendum lorem. Phasellus eget consequat odio. Vivamus malesuada dui iaculis odio luctus fermentum sed nec nulla. Phasellus eu mattis ante, et condimentum dui. Quisque semper, leo vitae laoreet porttitor, urna lacus sollicitudin nulla, eget ornare libero neque non lacus.Aenean placerat quam nec odio placerat, id condimentum ex ultrices. Fusce molestie dui quis nulla dignissim dignissim. Maecenas quis sollicitudin dui. Maecenas molestie a odio id placerat. Maecenas euismod nunc nisl, ut viverra felis fermentum vel. Duis quis vestibulum ligula. Vivamus posuere nec libero id laoreet. Ut rutrum fermentum sem, ac condimentum felis tempus quis. Curabitur nisi ex, blandit ac congue ac, mollis eu dolor. Nullam elit sapien, fermentum at ullamcorper eu, consectetur id tellus. Phasellus a egestas tellus. Suspendisse dapibus felis vel erat dictum tincidunt.';
    //   this.currentProductGroup.products.push(test);
    // }

    for (let i = 0; i < 10; i++) {
      var pg = new ProductGroup();

      pg = this.ad.productGroupTimeLine[0];
      pg.title = 'PG ' + i;
      pg.time = i * 4;
      this.ad.productGroupTimeLine.push(pg);
    }

    this.test = true;
  }

  onStartVideo() {
    var targetWindow = window.parent;
    targetWindow.postMessage('start', `${environment.homeUrl}`);

    console.log("In onStartVideo, preview value : " + this.preview);
    console.log("In onStartVideo, subscription value : " + this.subscription);

    if (!this.preview && this.subscription != null) {
      this.adService.createView(this.adId, this.subscription.cycleId).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('Error creating view');
        }
      );

      this.adService.increaseProjectViewCount(this.adId).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('Error increasing project view count');
        }
      );
    }

    //const numbers = timer(1000);
    //numbers.subscribe((x) => {
    this.showThumbnail = false;
    this.setSize();
    this.showVideo = true;
    this.videoPlayer.nativeElement.play();
    //});
  }

  disableLogic() {
    if (this.pgIndex == 0) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }

    if (this.pgIndex + 2 > this.ad.productGroupTimeLine.length) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  onPreviousProductGroup() {
    if (this.pgIndex - 1 < 0) {
      return;
    }

    this.pgIndex -= 1;

    this.disableLogic();

    this.currentProductGroup = this.ad.productGroupTimeLine[this.pgIndex];
  }

  onNextProductGroup() {
    if (this.disableNext) {
      return;
    }

    if (this.pgIndex + 1 > this.ad.productGroupTimeLine.length) {
      return;
    }

    this.pgIndex += 1;

    this.disableLogic();

    this.currentProductGroup = this.ad.productGroupTimeLine[this.pgIndex];
  }

  showBackToGroupButton() {
    if (this.ad.productGroupTimeLine.length > 1) {
      return true;
    } else {
      if (this.ad.productGroupTimeLine[0].products.length > 1) {
        return true;
      }
    }

    return false;
  }

  onExit() {
    var targetWindow = window.parent;
    //var url = environment.homeUrl;
    this.showThumbnail = true;
    this.showCanvas = false;
  }

  onBackToGroup() {
    this.viewState = 'ProductGroup';
  }

  onBuyNow() {
    if (!this.preview) {
      this.adService.increaseProductActionCount(this.currentProduct).subscribe(
        (res) => {
          console.log('Action Click!');
          console.log(res);
        },
        (err) => {
          console.log('Error retrieving ad');
        }
      );
    }

    window.open(this.currentProduct.makeThisYourLookURL, '_blank');
  }

  onClickThumbnail(thumbnail: any) {
    this.selectedImage = thumbnail;
  }

  onProductClick(product: Product) {
    if (!this.preview) {
      this.adService.increaseProductClickCount(product).subscribe(
        (res) => {
          console.log('Product Click!');
          console.log(res);
        },
        (err) => {
          console.log('Error retrieving ad');
        }
      );
    }

    this.currentProduct = product;
    this.selectedImage = product.images[0];
    this.viewState = 'Product';
  }

  onShowProduct() {
    this.videoPlayer.nativeElement.pause();

    // if (this.test == false) {
    //   this.testMultipleProductGroups();
    // }

    this.pgIndex = this.getProductGroupFromTime(
      this.videoPlayer.nativeElement.currentTime
    );

    this.disableLogic();

    if (
      this.ad.productGroupTimeLine.length == 1 &&
      this.ad.productGroupTimeLine[0].products.length == 1
    ) {
      this.viewState = 'Product';
    } else {
      this.viewState = 'ProductGroup';
    }

    this.currentProductGroup = this.ad.productGroupTimeLine[this.pgIndex];

    if (!this.preview) {
      this.adService
        .increaseProductGroupPauseCount(this.currentProductGroup)
        .subscribe(
          (res) => {
            console.log('Action Click!');
            console.log(res);
          },
          (err) => {
            console.log('Error retrieving ad');
          }
        );
    }

    // for (let i = 0; i < 10; i++) {
    //   var test = this.ad.productGroupTimeLine[0].products[0];
    //   test.description =
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis nulla, pellentesque id justo pharetra, mollis sollicitudin lorem. Pellentesque auctor arcu mi, non mattis risus luctus in. Nunc vitae hendrerit urna. Nullam lacus turpis, lacinia ac fringilla vitae, tempus quis sapien. Proin in bibendum lorem. Phasellus eget consequat odio. Vivamus malesuada dui iaculis odio luctus fermentum sed nec nulla. Phasellus eu mattis ante, et condimentum dui. Quisque semper, leo vitae laoreet porttitor, urna lacus sollicitudin nulla, eget ornare libero neque non lacus.Aenean placerat quam nec odio placerat, id condimentum ex ultrices. Fusce molestie dui quis nulla dignissim dignissim. Maecenas quis sollicitudin dui. Maecenas molestie a odio id placerat. Maecenas euismod nunc nisl, ut viverra felis fermentum vel. Duis quis vestibulum ligula. Vivamus posuere nec libero id laoreet. Ut rutrum fermentum sem, ac condimentum felis tempus quis. Curabitur nisi ex, blandit ac congue ac, mollis eu dolor. Nullam elit sapien, fermentum at ullamcorper eu, consectetur id tellus. Phasellus a egestas tellus. Suspendisse dapibus felis vel erat dictum tincidunt.';
    //   this.currentProductGroup.products.push(test);
    // }

    this.currentProduct = this.ad.productGroupTimeLine[0].products[0];

    if (
      this.currentProduct != null &&
      this.currentProduct.images != null &&
      this.currentProduct.images.length > 0
    ) {
      this.selectedImage = this.currentProduct.images[0];
    }

    this.videoPlayer.nativeElement.pause();

    this.drawCanvas();
    this.showVideo = false;
    this.showCanvas = true;
  }

  onEnded() {
    if (this.params['engagementId'] != null && this.params['campaignId']) {
      const navigationExtras: NavigationExtras = {
        state: { campaignId: this.campaignId },
      };
      this.router.navigate(['quiz'], navigationExtras);
    } else {
      this.onShowProduct();
    }
  }

  onResumeVideo() {
    this.showCanvas = false;
    this.showVideo = true;
    this.videoPlayer.nativeElement.play();
  }

  setSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var isW = w >= h * 1.7778;

    var vw = isW ? w : Math.round(h * 1.7778);
    var vh = isW ? Math.round(w * 0.5625) : h;
    var vol = Math.round((w - vw) / 2);
    var vot = Math.round((h - vh) / 2);

    this.videoPlayer.nativeElement.width = vw;
    this.videoPlayer.nativeElement.height = vh;
    //console.log("setSize() :  Width : " + vw + " Height : " + vh);
    this.videoPlayer.nativeElement.style.setProperty('left', vol + 'px');
    this.videoPlayer.nativeElement.style.setProperty('top', vot + 'px');
  }

  drawCanvas() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var isW = w >= h * 1.7778;

    var vw = isW ? w : Math.round(h * 1.7778);
    var vh = isW ? Math.round(w * 0.5625) : h;
    var vol = Math.round((w - vw) / 2);
    var vot = Math.round((h - vh) / 2);

    // this.videoPlayer.nativeElement.width = vw;
    // this.videoPlayer.nativeElement.height = vh;

    this.canvas.nativeElement.width = vw;
    this.canvas.nativeElement.height = vh;
    var ratio =
      this.videoPlayer.nativeElement.videoWidth /
      this.videoPlayer.nativeElement.videoHeight;

    // this.canvas.nativeElement.width = this.videoPlayer.nativeElement.width;
    // this.canvas.nativeElement.height = this.videoPlayer.nativeElement.height;
    this.canvas.nativeElement.style.setProperty('left', vol + 'px');
    this.canvas.nativeElement.style.setProperty('top', vot + 'px');

    var ctx = this.canvas.nativeElement.getContext('2d');

    var isIOS =
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/Macintosh/i);
    console.log('Video Is iOS : ' + isIOS);

    if (isIOS != null) {
      ctx.globalAlpha = 0.2;
    } else {
      ctx.filter = 'blur(20px) brightness(50%)';
    }
    //ctx.globalAlpha = 0.2;

    // if (this.platform.IOS) {
    //   console.log('Effect : brightness(25%)');
    //   ctx.filter = 'brightness(25%)';
    // } else {
    //   console.log('Effect : blur(20px) brightness(50%)');
    //   ctx.filter = 'brightness(25%)';
    //   //ctx.filter = 'blur(20px) brightness(50%)';
    // }

    ctx.drawImage(
      this.videoPlayer.nativeElement,
      (vw - this.canvas.nativeElement.height * ratio) / 2,
      vot,
      this.canvas.nativeElement.height * ratio,
      this.canvas.nativeElement.height
    );
  }

  // drawCanvas() {
  //   var w = window.innerWidth;
  //   var h = window.innerHeight;

  //   var isW = w >= h * 1.7778;

  //   var vw = isW ? w : Math.round(h * 1.7778);
  //   var vh = isW ? Math.round(w * 0.5625) : h;
  //   var vol = Math.round((w - vw) / 2);
  //   var vot = Math.round((h - vh) / 2);

  //   // this.videoPlayer.nativeElement.width = vw;
  //   // this.videoPlayer.nativeElement.height = vh;

  //   this.canvas.nativeElement.width = vw;
  //   this.canvas.nativeElement.height = vh;
  //   var ratio =
  //     this.videoPlayer.nativeElement.videoWidth /
  //     this.videoPlayer.nativeElement.videoHeight;

  //   // this.canvas.nativeElement.width = this.videoPlayer.nativeElement.width;
  //   // this.canvas.nativeElement.height = this.videoPlayer.nativeElement.height;
  //   this.canvas.nativeElement.style.setProperty('left', vol + 'px');
  //   this.canvas.nativeElement.style.setProperty('top', vot + 'px');

  //   var ctx = this.canvas.nativeElement.getContext('2d');
  //   ctx.filter = 'blur(20px) brightness(50%)';
  //   ctx.drawImage(
  //     this.videoPlayer.nativeElement,
  //     (vw - this.canvas.nativeElement.height * ratio) / 2,
  //     vot,
  //     this.canvas.nativeElement.height * ratio,
  //     this.canvas.nativeElement.height
  //   );
  // }

  getProductGroupFromTime(time: any) {
    if (this.ad.productGroupTimeLine.length == 1) {
      return 0;
    }

    for (var i = 0; i < this.ad.productGroupTimeLine.length; i++) {
      if (this.ad.productGroupTimeLine[i + 1] == null) {
        return i;
      } else {
        if (
          this.ad.productGroupTimeLine[i].time < time &&
          time < this.ad.productGroupTimeLine[i + 1].time
        ) {
          return i;
        }
      }
    }

    return -1;
  }

  onProductGroupClick(pg: any) {
    this.pgIndex = this.ad.productGroupTimeLine.indexOf(pg);
    this.disableLogic();
    this.currentProductGroup = pg;
    this.viewState = 'ProductGroup';
  }

  onAllProductGroupsClick() {
    this.viewState = 'AllProductGroups';
  }

  openDialog(): void {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.hasBackdrop = true;
    // dialogConfig.position = {
    //   top: '0',
    //   left: '0',
    // };

    const dialogRef = this.dialog.open(ImageCarouselComponent, {
      hasBackdrop: true,
      width: '100%',
      height: 'auto',
    });

    dialogRef.componentInstance.url = this.selectedImage.url;

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onSeekAndPlay() {
    this.videoPlayer.nativeElement.currentTime = this.currentProductGroup.time;
    this.onResumeVideo();
  }
}
