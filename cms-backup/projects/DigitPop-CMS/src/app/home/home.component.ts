import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HashLocationStrategy,
  Location,
  LocationStrategy,
} from '@angular/common';
import { environment } from '../../environments/environment';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../cms/preview/preview.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  animation,
  AnimationBuilder,
  sequence,
} from '@angular/animations';
import { FixedSizeTableVirtualScrollStrategy } from 'ng-table-virtual-scroll';
import { Platform } from '@angular/cdk/platform';

// interface customWindow extends Window {
//   billsbyData: any;
// }

// declare const window: customWindow;

@Component({
  selector: 'DigitPop-home',
  templateUrl: './home.component.html',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          top: '0px',
          left: '0px',
          position: 'fixed',
          width: '{{startWidth}}px',
          height: '{{startHeight}}px',
          opacity: 1,
        }),
        {
          params: {
            startHeight: window.innerHeight,
            startWidth: window.innerWidth,
          },
        }
      ),
      state(
        'closed',
        style({
          height: '100%',
          width: '100%',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  location: Location;
  iFrameSrc: any;
  fadeAnimation: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    location: Location,
    private _builder: AnimationBuilder,
    public platform: Platform
  ) {
    // window['billsbyData'] = {
    //   email: "fake@eamil.net"
    // };
    this.location = location;
    //this.iFrameSrc = `${environment.playerUrl}/ad/5aaad85b76f2c80400431c3c/embedded/true`;
    this.iFrameSrc = `${environment.playerUrl}/ad/60518dfbe73b860004205e72`;
    this.fadeAnimation = animation(
      [
        style({ opacity: '{{ start }}' }),
        animate('{{ time }}', style({ opacity: '{{ end }}' })),
      ],
      { params: { time: '1000ms', start: 0, end: 1 } }
    );

    console.log('User Agent : ' + window.navigator.userAgent);
    console.log('iOSVersion is : ' + this.iOSVersion());
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    var url = environment.playerUrl;

    console.log('Passing embedded player message');
    this.embeddedIFrame.nativeElement.contentWindow.postMessage(
      'embeddedPlayer',
      url
    );

    if (window.innerHeight > window.innerWidth) {
      console.log('Height greater than width - show message');
      this.embeddedIFrame.nativeElement.contentWindow.postMessage(
        'orientationPortrait',
        url
      );
    } else {
      console.log('Width greater than height - do not show message');
      this.embeddedIFrame.nativeElement.contentWindow.postMessage(
        'orientationLandscape',
        url
      );
    }

    console.log('orientationChanged');
  }

  preview() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: '5aaad85b76f2c80400431c3c',
    };

    const dialogRef = this.dialog.open(PreviewComponent, dialogConfig);
  }

  @ViewChild('embeddedFrame') embeddedFrame: ElementRef;
  @ViewChild('embeddedIFrame') embeddedIFrame: ElementRef;
  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);

    if (this.route != null && this.route.queryParams != null) {
      var x = this.route.queryParams;
    }
  }

  iOSVersion() {
    if (window.MSStream) {
      // There is some iOS in Windows Phone...
      // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
      return false;
    }
    var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
      version;

    if (match !== undefined && match !== null) {
      version = [parseInt(match[1], 10), parseInt(match[2], 10)];
      return parseFloat(version.join('.'));
    }

    return false;
  }

  receiveMessage(event: any) {
    console.log('In dashboard, receiveMessage, received event : ' + event);

    if (event.data === 'exit') {
      console.log('Received EXIT message from player.');

      var isIOS =
        window.navigator.userAgent.match(/iPhone/i) ||
        window.navigator.userAgent.match(/iPad/i); // ||
      //window.navigator.userAgent.match(/Macintosh/i);
      console.log('Video Is iOS : ' + isIOS);

      if (isIOS != null) {
        this.embeddedFrame.nativeElement.style.setProperty(
          'position',
          'static'
        );
        this.embeddedFrame.nativeElement.style.setProperty('left', 0 + 'px');
        this.embeddedFrame.nativeElement.style.setProperty('top', 0 + 'px');

        this.embeddedFrame.nativeElement.style.setProperty('width', '100%');
        this.embeddedFrame.nativeElement.style.setProperty('height', '100%');

        this.embeddedIFrame.nativeElement.style.setProperty('width', '100%');
        this.embeddedIFrame.nativeElement.style.setProperty('height', '100%');

        console.log('WHY');
      } else if (window.navigator.userAgent.match(/Macintosh/i)) {
        console.log('Close action in Macintosh SMOSH');
        this.embeddedFrame.nativeElement.style.setProperty(
          'position',
          'static'
        );
        this.embeddedFrame.nativeElement.style.setProperty('left', 0 + 'px');
        this.embeddedFrame.nativeElement.style.setProperty('top', 0 + 'px');
        this.embeddedFrame.nativeElement.style.setProperty('width', '100%');
        this.embeddedFrame.nativeElement.style.setProperty('height', '100%');
        this.embeddedIFrame.nativeElement.style.setProperty('width', '100%');
        this.embeddedIFrame.nativeElement.style.setProperty('height', '100%');
      } else {
        const closeAnimation = this._builder.build([
          animate(
            500,
            style({
              top: '0px',
              left: '0px',
              position: 'static',
              width: '100%',
              height: '100%',
              opacity: 1,
            })
          ),
        ]);

        // use the returned factory object to create a player
        const player = closeAnimation.create(this.embeddedFrame.nativeElement);

        player.play();
      }
    }

    if (event.data === 'start') {
      console.log('Received START message from player.');

      var isIOS =
        window.navigator.userAgent.match(/iPhone/i) ||
        window.navigator.userAgent.match(/iPad/i); //||
      //window.navigator.userAgent.match(/Macintosh/i);
      console.log('Video Is iOS : ' + isIOS);

      if (isIOS != null) {
        console.log('IOS Animation open ');
        console.log('iOSVersion is : ' + this.iOSVersion());

        var isIOS13 = window.navigator.userAgent.match(/iPhone OS 13/i);
        console.log('isIOS13 is : ' + isIOS);

        this.embeddedFrame.nativeElement.style.setProperty('position', 'fixed');
        this.embeddedFrame.nativeElement.style.setProperty('left', 0 + 'px');
        this.embeddedFrame.nativeElement.style.setProperty('top', 0 + 'px');

        console.log('Setting size properties.  Width : ' + window.innerWidth);
        console.log('Setting size properties.  Height : ' + window.innerHeight);

        var version = this.iOSVersion();
        console.log('iOSVersion IS : ' + version);

        if (version >= 13 && version < 14) {
          console.log(
            'Version is greater than or equal to 13 and less than 14'
          );

          this.embeddedIFrame.nativeElement.style.setProperty(
            'width',
            window.innerWidth + 'px'
          );

          this.embeddedIFrame.nativeElement.style.setProperty(
            'height',
            window.innerHeight + 'px'
          );

          this.embeddedFrame.nativeElement.style.setProperty(
            'width',
            window.innerWidth + 'px'
          );

          this.embeddedFrame.nativeElement.style.setProperty(
            'height',
            window.innerHeight + 'px'
          );
        } else if (version == 14) {
          console.log('Version is NOT less than 14');
          this.embeddedFrame.nativeElement.style.setProperty('width', '100%');

          this.embeddedFrame.nativeElement.style.setProperty('height', '100%');
        } else if (version < 13) {
          console.log('ALERT User Agent : ' + window.navigator.userAgent);
          console.log('Open in new window');
          window.open(this.iFrameSrc);
        }
      } else if (window.navigator.userAgent.match(/Macintosh/i)) {
        console.log('Open action in Macintosh TOSH');

        if (window.navigator.userAgent.match(/Safari/i)) {
          console.log('Sarari Mac Open in new window');
          //window.open(this.iFrameSrc);
        } else {
          this.embeddedFrame.nativeElement.style.setProperty(
            'position',
            'fixed'
          );
          this.embeddedFrame.nativeElement.style.setProperty('left', 0 + 'px');
          this.embeddedFrame.nativeElement.style.setProperty('top', 0 + 'px');
          this.embeddedFrame.nativeElement.style.setProperty(
            'width',
            window.innerWidth + 'px'
          );

          this.embeddedFrame.nativeElement.style.setProperty(
            'height',
            window.innerHeight + 'px'
          );
        }
      } else {
        console.log('Animation open ');
        const startAnimation = this._builder.build([
          sequence([
            animate(
              100,
              style({
                top: '0px',
                left: '0px',
                position: 'fixed',
                width: window.innerWidth,
                height: window.innerHeight,
              })
            ),
            animate(
              400,
              style({
                width: window.innerWidth,
                height: window.innerHeight,
              })
            ),
          ]),
        ]);

        // use the returned factory object to create a player
        const player = startAnimation.create(this.embeddedFrame.nativeElement);

        player.play();
      }
    }
  }
  clicktrial(){
   
    let element: HTMLElement = document.getElementById("checkout") as HTMLElement;
    element.click();
    console.log("Trial clicked");
    return {message:'trial mode'}
  }
  ngOnDestroy(): void {
    var frame = document.getElementById('checkout-billsby-iframe');

    if (frame != null) {
      frame.parentNode.removeChild(frame);
    }

    var bg = document.getElementById('checkout-billsby-outer-background');

    if (bg != null) {
      bg.parentNode.removeChild(bg);
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
